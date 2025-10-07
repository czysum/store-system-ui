<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="sku名称" prop="skuName">
              <el-input v-model="queryParams.skuName" placeholder="请输入sku名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['store:sku:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['store:sku:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['store:sku:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['store:sku:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="skuList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键" align="center" prop="skuId" v-if="true" />
        <el-table-column label="sku名称" align="center" prop="skuName" />
        <el-table-column label="库存id" align="center" prop="stockNamesStr" />
        <el-table-column label="ossId" align="center" prop="ossidUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.ossidUrl" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="扣除数量" align="center" prop="deductNum" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="绑定库存" placement="top">
              <el-button link type="primary" icon="Plus" @click="bindStock(scope.row)" v-hasPermi="['store:sku:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['store:sku:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['store:sku:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改sku对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="skuFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="sku名称" prop="skuName">
          <el-input v-model="form.skuName" placeholder="请输入sku名称" />
        </el-form-item>
<!--   库存改为分表管理，废弃这个字段     -->
<!--        <el-form-item label="库存id" prop="stockId">-->
<!--          <el-input v-model="form.stockId" placeholder="请输入库存id" />-->
<!--        </el-form-item>-->
        <el-form-item label="ossId" prop="ossid">
          <image-upload v-model="form.ossid"/>
        </el-form-item>
        <el-form-item label="扣除数量" prop="deductNum">
          <el-input v-model="form.deductNum" placeholder="请输入扣除数量" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>


    <el-dialog :title="bindDialog.title" v-model="bindDialog.visible" width="500px" append-to-body>

      <el-checkbox-group v-model="stockForm">
        <!-- works when >=2.6.0, recommended ✔️ value not work when <2.6.0 ❌ -->

        <el-checkbox v-for="item in stockVos" :label="item.stockName" :value="item.stockId" />

      </el-checkbox-group>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="bindStockSku">关联</el-button>
          <el-button @click="bindCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Sku" lang="ts">
import { listSku, getSku, delSku, addSku, updateSku } from '@/api/store/sku';
import { SkuVO, SkuQuery, SkuForm } from '@/api/store/sku/types';
import {StockVO} from "@/api/store/stock/types";
import {allListStock} from "@/api/store/stock";
import {bindStockSkuApi, findBySkuId} from "@/api/store/stockSku";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const stockVos= ref<StockVO[]>([]);
const stockForm = ref<Array<string | number>>([])
const skuId = ref<String | number>(null)

const skuList = ref<SkuVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const skuFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
});

const bindDialog = reactive<DialogOption>({
  visible: false,
  title: '',
});

const bindCancel = ()=>{
  resetBindStock()
  bindDialog.visible = false;
}

const bindStockSku = async()=>{
  await bindStockSkuApi({"stockIds":stockForm.value,"skuId":skuId.value})
  bindDialog.visible = false;
  await getList();
}

const initFormData: SkuForm = {
  skuId: undefined,
  skuName: undefined,
  stockId: undefined,
  ossid: undefined,
  deductNum: undefined,
  remark: undefined
}
const data = reactive<PageData<SkuForm, SkuQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    skuName: undefined,
    params: {
    }
  },
  rules: {
    skuId: [
      { required: true, message: "主键不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询sku列表 */
const getList = async () => {
  loading.value = true;
  const res = await listSku(queryParams.value);
  skuList.value = res.rows;
  // 解析库存
  res.rows.forEach(i=>{
    let stockStr = "";
    i.tbStockVos.forEach(s=>{
      stockStr+=s.stockName+",";
    })
    i.stockNamesStr=(stockStr).slice(0,-1)
  })
  total.value = res.total;
  loading.value = false;
}
const getStockList = async ()=>{
  const res = await allListStock();
  stockVos.value = res.data;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  skuFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: SkuVO[]) => {
  ids.value = selection.map(item => item.skuId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加sku";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: SkuVO) => {
  reset();
  const _skuId = row?.skuId || ids.value[0]
  const res = await getSku(_skuId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改sku";
}

const resetBindStock = ()=>{
  stockForm.value = []
}

const bindStock =  async (row)=>{
  resetBindStock()
  skuId.value = row.skuId
  //查找对应的先勾上
  const res =  await findBySkuId(row.skuId)
  stockForm.value = res.data
  bindDialog.visible = true;
  bindDialog.title = "绑定库存";
}


/** 提交按钮 */
const submitForm = () => {
  skuFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.skuId) {
        await updateSku(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addSku(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: SkuVO) => {
  const _skuIds = row?.skuId || ids.value;
  await proxy?.$modal.confirm('是否确认删除sku编号为"' + _skuIds + '"的数据项？').finally(() => loading.value = false);
  await delSku(_skuIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('store/sku/export', {
    ...queryParams.value
  }, `sku_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
  getStockList();
});
</script>
