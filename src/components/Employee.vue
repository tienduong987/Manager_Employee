<template>
  <div>
    <!-- start form thêm nhân viên -->
    <div>
      <p><el-input v-model="search" style="width:500px" placeholder="Nhập tìm kiếm"/> </p>
      <el-button
        type="success"
        icon="el-icon-circle-plus"
        style="margin-bottom: 10px"
        @click="(dialogVisible = true)"
        >Thêm Nhân viên</el-button
      >
      <el-dialog
        title="Thêm nhân viên"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <span>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Họ và Tên">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Chức vụ">
              <el-input v-model="form.position"></el-input>
            </el-form-item>
            <el-form-item label="Đơn vị">
              <el-input v-model="form.unit"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="(dialogVisible = false), clickCancel()"
            >Cancel</el-button
          >
          <el-button
            type="primary"
            @click="(dialogVisible = false), clickSave(form)"
            >Save</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- end form nhân viên -->
    <!-- Đổ dữ liệu ra form -->
    <el-table :data="pageEmployee.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" empty-text='Không có dữ liệu phù hợp'>
      <el-table-column label="#" type='index' :index='handleIndex' width="80" > </el-table-column>
      <el-table-column label="Nhân viên" width="200">
        <template slot-scope="scope">   
            <span size="medium">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Chức vụ" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Đơn vị" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Tác vụ">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="handleEdit(scope.row), (dialogVisible = true)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row.id)"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
        <div slot="append" v-if="tableData.length=='0'">Chưa có nhân viên nào</div>
    </el-table >
    <!-- Start pagination -->
    <el-pagination
          style="float:right;margin:20px"
          :total="list.length"
          background
          :current-page="1"
          @current-change="setPage"
          layout="prev, pager, next">
    </el-pagination>
    <!-- End pagination -->
    <!-- end đổ dữ liệu ra form -->
    
  </div>
</template>

<script>
import { mapActions,mapGetters} from 'vuex';
export default {
  
  name: "Employee",
  data() {
    return {
      search: '',
      dialogVisible: false,
      tableData: [],
      form: {
        id: "",
        name: "",
        position: "",
        unit: "",
      },
      sizePage:10,
      page:1,
    };
  },
  created(){
    this.getAllEmployee();
   
  },


  computed:{
    ...mapGetters(["list"]),
    pageEmployee(){
      return this.list.slice( this.sizePage * this.page - this.sizePage,this.sizePage * this.page)
    }
  
  },
  methods: {
    ...mapActions([
      'getAllEmployee',
      'deleteEmployee',
      'updateEmployee',
      'addEmployee'
    ]),
    handleIndex(index){
      return this.sizePage * (this.page - 1)+ index + 1
    },
    handleEdit(data,type) {
      this.type =type,
      this.form = {
        id: data.id,
        name: data.name,
        position: data.position,
        unit: data.unit,
      };
    },
    handleDelete(row) {
      console.log(row)
      this.deleteEmployee(row)
    
    },
    clickCancel() {
      this.form = {
        id: "",
        name: "",
        position: "",
        unit: "",
      };
    },
    clickSave(data) {
      let index= this.list.findIndex(item =>item.id == data.id)
      console.log(index)
      if(index <0){
        this.addEmployee(this.form)
        
      }else {
       this.updateEmployee(this.form)
      }
      this.form = {
          id: '',
          name: "",
          position: "",
          unit: "",
        }
    },
    setPage(val){
      this.page =val;
    }
    
  }
}
</script>

<style>
.el-table__append-wrapper{
  display: none;
}
</style>