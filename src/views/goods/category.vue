<template>
    <el-card>
        <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
        <el-row>
            <el-col class="Addcategoryies">
                <el-button plain type="success">添加分类</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
         <el-table
            border
            stripe
            :data="list"
            style="width: 100%">
            <el-table-column
                prop="cat_name"
                label="分类名称"
                width="180">
            </el-table-column>
            <el-table-column
                label="级别"
                width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_pid === 0">一级</span>
                    <span v-if="scope.row.cat_pid === 1">二级</span>
                    <span v-if="scope.row.cat_pid === 2">三级</span>
                </template>
            </el-table-column>
            <el-table-column
                label="是否有效">
                <template slot-scope="scope">
                     {{ scope.row.cat_deleted ? '无效' : '有效' }}
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button  plain type="primary" size="mini" icon="el-icon-edit"></el-button>
                    <el-button  plain type="danger" size="mini" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-card>

</template>

<script>
export default {
  data() {
    return {
      list: [],
      //   分页相关的数据
      pagenum: 1,
      pagesize: 5,
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载列表
    async loadData() {
      const {data: resData} = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const {data: {result, total}, meta: {status, msg}} = resData;
      if (status === 200) {
        this.list = result;
        // 获取总条数
        this.total = total;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.Addcategoryies{
    margin-top:10px;
    margin-bottom:10px;
}
</style>
