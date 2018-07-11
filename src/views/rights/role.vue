<template>
<!-- 角色列表 -->
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
        <!-- 添加角色按钮 -->
        <el-row class="addrole">
            <el-col>
                <el-button type="success" plain>添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
            border
            stripe
            :data="list"
            style="width: 100%">
            <!-- 展开列
            思路1、将一行分为2列，第一列是一级，
            2、再将第二列拆分成2列 一个显示二级 一个显示三级
            总结：看文档明确后台返回的数据格式-->
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <!-- 当前角色中的权限列表 -->
                    <!-- scope.row 角色对象 ---- roleName, roleDesc, children -->
                    <!-- 一级权限 item1 -->
                    <el-row
                    v-for="item1 in scope.row.children"
                    :key="item1.id"
                    class="level1">
                    <!-- 显示一级权限 -->
                        <el-col :span="4">
                            <!-- close是关闭 Tag 时触发的事件 -->
                            <el-tag
                                closable
                                type=''
                                @close="handleDeleteright(scope.row,item1.id)">
                                {{item1.authName}}
                            </el-tag>
                            <i class="el-icon-arrow-right"></i>
                       </el-col>
                       <!-- 显示二级和三级列表 -->
                        <el-col :span="20">
                            <!-- 显示二级权限列表 -->
                            <el-row
                                v-for="item2 in  item1.children"
                                :key="item2.id"
                                class="level2">
                                <el-col :span="4">
                                   <el-tag
                                   closable
                                   type='success'
                                    @close="handleDeleteright(scope.row,item2.id)">
                                        {{item2.authName}}
                                    </el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="20">
                                    <!-- 显示三级权限列表 -->
                                    <el-tag
                                        type='warning'
                                        closable
                                        v-for="item3 in item2.children"
                                        :key="item3.id"
                                        class="level3"
                                         @close="handleDeleteright(scope.row,item3.id)">
                                        {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>

            </el-table-column>
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称"
                width="400">
            </el-table-column>
            <el-table-column
                prop="roleDesc"
                label="角色描述"
                width="400">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                    <el-button  type="danger" size="mini" icon="el-icon-delete"></el-button>
                    <el-button  plain type="success" size="mini" icon="el-icon-check"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.loadDate();
  },
  methods: {
    // 加载角色列表
    async loadDate() {
      const {data: resData} = await this.$http.get('roles');
      const {data, meta: {status, msg}} = resData;
      if (status === 200) {
        this.list = data;
      } else {
        this.$message.error(msg);
      }
    },
    // 删除指定权限[一定要清楚后台返回的数据是什么格式]
    async handleDeleteright (role, rightId) {
      const {data: resData} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      const {data, meta: {status, msg}} = resData;
      if (status === 200) {
        // 成功
        // 提示
        this.$message.success(msg);
        // 重新绑定当前角色的children 权限 实现局部重新加载数据
        role.children = data;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.addrole{
    margin:20px 0 20px 0;
}
.level1{
    margin-top:10px;
}
.level3{
    margin:5px 5px;
}

</style>
