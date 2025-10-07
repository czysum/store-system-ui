<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="平台单号" prop="platformOrder">
              <el-input v-model="queryParams.platformOrder" placeholder="请输入平台订单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="平台" prop="platform">
              <el-select v-model="queryParams.platform" placeholder="请选择平台" clearable >
                <el-option v-for="dict in platform" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="采购单号" prop="purchaseOrder">
              <el-input v-model="queryParams.purchaseOrder" placeholder="请输入采购单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单店铺" prop="shopId">
              <el-input v-model="queryParams.shopId" placeholder="请输入订单店铺" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="店铺名称" prop="shopName">
              <el-input v-model="queryParams.shopName" placeholder="请输入店铺名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="sku名称" prop="skuName">
              <el-input v-model="queryParams.skuName" placeholder="请输入sku名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品ID" prop="platformGoodId">
              <el-input v-model="queryParams.platformGoodId" placeholder="请输入商品ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品编码" prop="skuId">
              <el-input v-model="queryParams.skuId" placeholder="请输入商品编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="利润" prop="profit">
              <el-input v-model="queryParams.profit" placeholder="请输入利润" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单状态" prop="orderStatus">
              <el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态" clearable >
                <el-option v-for="dict in order_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="发货单号" prop="postageOrder">
              <el-input v-model="queryParams.postageOrder" placeholder="请输入发货单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="退货单号" prop="rePostageOrder">
              <el-input v-model="queryParams.rePostageOrder" placeholder="请输入退货单号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="发货时间" style="width: 308px">
              <el-date-picker
                v-model="dateRangeSendTime"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['store:order:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['store:order:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['store:order:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['store:order:export']">导出</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Top" @click="handleImport" v-hasPermi="['system:user:import']">导入</el-button>
          </el-col>
<!--          <el-dropdown-item v-if="checkPermi(['system:user:import'])" icon="Top" @click="handleImport">导入数据</el-dropdown-item>-->
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="orderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键" align="center" prop="orderId" v-if="true" />
        <el-table-column label="平台订单号" align="center" prop="platformOrder" />
        <el-table-column label="平台" align="center" prop="platform">
          <template #default="scope">
            <dict-tag :options="platform" :value="scope.row.platform"/>
          </template>
        </el-table-column>
        <el-table-column label="采购单号" align="center" prop="purchaseOrder" />
        <el-table-column label="订单店铺" align="center" prop="shopId" />
        <el-table-column label="店铺名称" align="center" prop="shopName" />
        <el-table-column label="图片" align="center" prop="ossidUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.ossidUrl" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="sku名称" align="center" prop="skuName" />
        <el-table-column label="商品ID" align="center" prop="platformGoodId" />
        <el-table-column label="商品编码" align="center" prop="skuId" />
        <el-table-column label="数量" align="center" prop="orderNum" />
        <el-table-column label="销售价" align="center" prop="shopPrise" />
        <el-table-column label="成本" align="center" prop="cost" />
        <el-table-column label="邮费" align="center" prop="postagePrise" />
        <el-table-column label="推广费" align="center" prop="carPrise" />
        <el-table-column label="运费险" align="center" prop="postageInsurance" />
        <el-table-column label="补偿金" align="center" prop="compensation" />
        <el-table-column label="利润" align="center" prop="profit" />
        <el-table-column label="订单状态" align="center" prop="orderStatus">
          <template #default="scope">
            <dict-tag :options="order_status" :value="scope.row.orderStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="发货单号" align="center" prop="postageOrder" />
        <el-table-column label="退货单号" align="center" prop="rePostageOrder" />
        <el-table-column label="发货时间" align="center" prop="sendTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.sendTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['store:order:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['store:order:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orderFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="平台订单号" prop="platformOrder">
          <el-input v-model="form.platformOrder" placeholder="请输入平台订单号" />
        </el-form-item>
        <el-form-item label="平台" prop="platform">
          <el-select v-model="form.platform" placeholder="请选择平台">
            <el-option
                v-for="dict in platform"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购单号" prop="purchaseOrder">
          <el-input v-model="form.purchaseOrder" placeholder="请输入采购单号" />
        </el-form-item>
        <el-form-item label="订单店铺" prop="shopId">
          <el-input v-model="form.shopId" placeholder="请输入订单店铺" />
        </el-form-item>
        <el-form-item label="店铺名称" prop="shopName">
          <el-input v-model="form.shopName" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="图片" prop="ossid">
          <image-upload v-model="form.ossid"/>
        </el-form-item>
        <el-form-item label="sku名称" prop="skuName">
          <el-input v-model="form.skuName" placeholder="请输入sku名称" />
        </el-form-item>
        <el-form-item label="商品ID" prop="platformGoodId">
          <el-input v-model="form.platformGoodId" placeholder="请输入商品ID" />
        </el-form-item>
        <el-form-item label="商品编码" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入商品编码" />
        </el-form-item>
        <el-form-item label="数量" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="销售价" prop="shopPrise">
          <el-input v-model="form.shopPrise" placeholder="请输入销售价" />
        </el-form-item>
        <el-form-item label="成本" prop="cost">
          <el-input v-model="form.cost" placeholder="请输入成本" />
        </el-form-item>
        <el-form-item label="邮费" prop="postagePrise">
          <el-input v-model="form.postagePrise" placeholder="请输入邮费" />
        </el-form-item>
        <el-form-item label="推广费" prop="carPrise">
          <el-input v-model="form.carPrise" placeholder="请输入推广费" />
        </el-form-item>
        <el-form-item label="运费险" prop="postageInsurance">
          <el-input v-model="form.postageInsurance" placeholder="请输入运费险" />
        </el-form-item>
        <el-form-item label="补偿金" prop="compensation">
          <el-input v-model="form.compensation" placeholder="请输入补偿金" />
        </el-form-item>
        <el-form-item label="利润" prop="profit">
          <el-input v-model="form.profit" placeholder="请输入利润" />
        </el-form-item>
        <el-form-item label="订单状态" prop="orderStatus">
          <el-select v-model="form.orderStatus" placeholder="请选择订单状态">
            <el-option
                v-for="dict in order_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货单号" prop="postageOrder">
          <el-input v-model="form.postageOrder" placeholder="请输入发货单号" />
        </el-form-item>
        <el-form-item label="退货单号" prop="rePostageOrder">
          <el-input v-model="form.rePostageOrder" placeholder="请输入退货单号" />
        </el-form-item>
        <el-form-item label="发货时间" prop="sendTime">
          <el-date-picker clearable
            v-model="form.sendTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择发货时间">
          </el-date-picker>
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

    <el-dialog v-model="upload.open" :title="upload.title" width="400px" append-to-body>
      <el-upload
          ref="uploadRef"
          :limit="1"
          accept=".xlsx, .xls"
          :headers="upload.headers"
          :action="upload.url + '?platform=' + upload.platform"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false"
          drag
      >
        <el-icon class="el-icon--upload">
          <i-ep-upload-filled />
        </el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="text-center el-upload__tip">
            <el-form-item label="平台" prop="platform">
              <el-select v-model="upload.platform" placeholder="请选择平台" clearable >
                <el-option v-for="dict in platform" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <span>仅允许导入xls、xlsx格式文件。</span>

          </div>
        </template>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">确 定</el-button>
          <el-button @click="upload.open = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>

<script setup name="Order" lang="ts">
import { listOrder, getOrder, delOrder, addOrder, updateOrder } from '@/api/store/order';
import { OrderVO, OrderQuery, OrderForm } from '@/api/store/order/types';
import {checkPermi} from "@/utils/permission";
import {globalHeaders} from "@/utils/request";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { platform, order_status } = toRefs<any>(proxy?.useDict('platform', 'order_status'));

const orderList = ref<OrderVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const dateRangeSendTime = ref<[DateModelType, DateModelType]>(['', '']);

const queryFormRef = ref<ElFormInstance>();
const orderFormRef = ref<ElFormInstance>();

/*** 用户导入参数 */
const upload = reactive<ImportOption>({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: '',
  // 是否禁用上传
  isUploading: false,
  // 是否更新已经存在的用户数据
  updateSupport: 0,
  platform:0,
  // 设置上传的请求头部
  headers: globalHeaders(),
  // 上传的地址
  url: import.meta.env.VITE_APP_BASE_API + '/store/order/importData'
});
const uploadRef = ref<ElUploadInstance>();
/** 导入按钮操作 */
const handleImport = () => {
  upload.title = '订单导入';
  upload.open = true;
};
const handleFileUploadProgress = () => {
  upload.isUploading = true;
};
/** 文件上传成功处理 */
const handleFileSuccess = (response: any, file: UploadFile) => {
  upload.open = false;
  upload.isUploading = false;
  uploadRef.value?.handleRemove(file);
  ElMessageBox.alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>', '导入结果', {
    dangerouslyUseHTMLString: true
  });
  getList();
};
/** 提交上传文件 */
function submitFileForm() {
  uploadRef.value?.submit();
}


const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OrderForm = {
  orderId: undefined,
  platformOrder: undefined,
  platform: undefined,
  purchaseOrder: undefined,
  shopId: undefined,
  shopName: undefined,
  ossid: undefined,
  skuName: undefined,
  platformGoodId: undefined,
  skuId: undefined,
  orderNum: undefined,
  shopPrise: undefined,
  cost: undefined,
  postagePrise: undefined,
  carPrise: undefined,
  postageInsurance: undefined,
  compensation: undefined,
  profit: undefined,
  orderStatus: undefined,
  postageOrder: undefined,
  rePostageOrder: undefined,
  sendTime: undefined,
  remark: undefined
}
const data = reactive<PageData<OrderForm, OrderQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    platformOrder: undefined,
    platform: undefined,
    purchaseOrder: undefined,
    shopId: undefined,
    shopName: undefined,
    skuName: undefined,
    platformGoodId: undefined,
    skuId: undefined,
    profit: undefined,
    orderStatus: undefined,
    postageOrder: undefined,
    rePostageOrder: undefined,
    params: {
      sendTime: undefined,
    }
  },
  rules: {
    orderId: [
      { required: true, message: "主键不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询订单列表 */
const getList = async () => {
  loading.value = true;
  queryParams.value.params = {};
  proxy?.addDateRange(queryParams.value, dateRangeSendTime.value, 'SendTime');
  const res = await listOrder(queryParams.value);
  orderList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  orderFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  dateRangeSendTime.value = ['', ''];
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: OrderVO[]) => {
  ids.value = selection.map(item => item.orderId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加订单";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderVO) => {
  reset();
  const _orderId = row?.orderId || ids.value[0]
  const res = await getOrder(_orderId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改订单";
}

/** 提交按钮 */
const submitForm = () => {
  orderFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.orderId) {
        await updateOrder(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOrder(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OrderVO) => {
  const _orderIds = row?.orderId || ids.value;
  await proxy?.$modal.confirm('是否确认删除订单编号为"' + _orderIds + '"的数据项？').finally(() => loading.value = false);
  await delOrder(_orderIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('store/order/export', {
    ...queryParams.value
  }, `order_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
