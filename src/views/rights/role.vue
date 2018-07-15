<template>
<!-- 角色列表 -->
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
        <!-- 添加角色按钮 -->
        <el-row class="addrole">
            <el-col>
                <el-button @click="addroledialog=true" type="success" plain>添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
            border
            stripe
            :data="list"
            style="width: 100%">/
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
                    <el-button @click="editForm(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
                    <el-button @click="handleDelete(scope.row.id)" type="danger" size="mini" icon="el-icon-delete"></el-button>
                    <el-button @click="SetRights(scope.row)" type="success" size="mini" icon="el-icon-check"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--   分配权限的对话框
        open打开对话框的执行-->
        <el-dialog
            title="分配权限"
            :visible.sync="SetRightsdialogVisible"
            width="30%"
            @open="handleSetRights">
            <!-- tree树
             data: 提供树形数据
            props: 设置数据中显示的属性-->
            <el-tree
                ref="tree"
                v-loading="loadingTree"
                :data="treeData"
                :props="defaultProps"
                node-key="id"
                :default-checked-keys="checkedList"
                show-checkbox
                default-expand-all>
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="SetRightsdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSetRightsList">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加角色 -->
        <el-dialog
            title="添加角色"
            :visible.sync="addroledialog"
            width="30%">
            <el-form  :model="addform" label-width="100px" class="demo-ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="角色名称" prop="roleName" >
                    <el-input v-model="addform.roleName" ></el-input>
                </el-form-item>
                 <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addform.roleDesc" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addroledialog = false">取 消</el-button>
                <el-button type="primary" @click="handleaddForm">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑角色 -->
        <el-dialog
            title="编辑角色"
            :visible.sync="editroledialog"
            width="30%">
            <el-form  :model="addform" label-width="100px" class="demo-ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="角色名称" prop="roleName" >
                    <el-input v-model="addform.roleName" ></el-input>
                </el-form-item>
                 <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addform.roleDesc" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editroledialog = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit">确 定</el-button>
            </span>
        </el-dialog>

    </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      //   控制设置权限的对话框的显示或者隐藏
      SetRightsdialogVisible: false,
      loadingTree: true,
      //   绑定tree上所有的数据
      treeData: [],
      // 获取要选择的节点的id
      checkedList: [],
      // 记录当前修改的角色id
      currentRoleId: -1,
      // 配置要展示数据中的哪个属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      //   编辑角色对话框的显示或者隐藏
      editroledialog: false,
      // 添加角色对话框的显示或者隐藏
      addroledialog: false,
      //   添加角色表单数据
      addform: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请对角色进行描述', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.loadDate();
  },
  methods: {
    // 加载角色列表
    async loadDate() {
      this.loading = true;
      const {data: resData} = await this.$http.get('roles');
      this.loading = false;
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
    },
    // 获取tree上所有数据 当打开对话框的时候执行
    async handleSetRights() {
      this.loadingTree = true;
      const {data: resData} = await this.$http.get('rights/tree');
      this.loadingTree = false;
      const { data } = resData;
      this.treeData = data;
    },
    // 点击按钮，显示分配权限的对话框
    SetRights(role) {
      // 记录角色id， 分配权限的时候使用
      this.currentRoleId = role.id;

      this.SetRightsdialogVisible = true;
      // 获取当前角色所拥有的权限的id
      // 遍历一级权限
      const arr = [];
      role.children.forEach((item1) => {
        // arr.push(item1.id);
        // 遍历二级权限
        item1.children.forEach((item2) => {
          // arr.push(item2.id);
          // 遍历三级权限
          item2.children.forEach((item3) => {
            arr.push(item3.id);
          });
        });
      });
      this.checkedList = arr;
    },
    // 当点击对话框中的确定按钮的时候,分配权限
    async handleSetRightsList() {
      // 获取到被选中的节点的id
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      // 获取到半选的节点的id
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      //   将上面的两个数组合并
      const newArray = [...checkedKeys, ...halfCheckedKeys];
      const { data: resData } = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: newArray.join(',')
      });
      const { meta: { status, msg } } = resData;
      if (status === 200) {
        // 成功
        // 关闭对话框
        this.SetRightsdialogVisible = false;
        // 提示
        this.$message.success(msg);
        // 重新加载数据
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    // 添加角色
    async handleaddForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请完整输入内容');
        }
        const res = await this.$http.post('roles', this.addform);
        const data = res.data;
        const {meta: {status, msg}} = data;
        if (status === 201) {
          // 添加成功
          // 关闭对话框
          this.addroledialog = false;
          // 重新加载数据
          this.loadDate();
          // 提示
          this.$message.success(msg);
          //   清空对话框
          for (let key in this.addform) {
            this.addform[key] = '';
          }
        } else {
          // 提示添加失败
          this.$message.error(msg);
        }
      });
    },
    // 删除角色
    async handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`roles/${id}`);
        const data = res.data;
        const {meta: {status, msg}} = data;
        if (status === 200) {
          // 删除成功
          // 重新加载数据列表
          this.loadDate();
          this.$message({
            type: 'success',
            message: msg
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 点击编辑按钮显示列表
    async editForm(role) {
      // 显示对话框
      this.editroledialog = true;
      this.addform = role;
      // this.addform.roleName = role.roleName;
      // this.addform.roleDesc = role.roleDesc;
    },
    // 点击编辑对话框中的确定按钮的时候执行
    async handleEdit() {
      // console.log(this.addform);
      const res = await this.$http.put(`roles/${this.addform.id}`, {
        roleName: this.addform.roleName,
        roleDesc: this.addform.roleDesc
      });
      const data = res.data;
      const {meta: {status, msg}} = data;
      if (status === 200) {
        this.editroledialog = false;
        this.loadDate();
        this.$message.success(msg);
        // 清空文本框
        for (let key in this.addform) {
          this.addform[key] = '';
        }
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
