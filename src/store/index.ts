import Vue from 'vue'
import Vuex from 'vuex'
import createId from "@/lib/createId";
import router from "@/router";
import clone from "@/lib/clone";

Vue.use(Vuex);

const store =  new Vuex.Store({
  state: {
    recordList:[],
    tagList:[],
    currentTag:undefined,
    currentRecord:undefined,
    createRecordError: null,
    createTagError: null,
  } as RootState,
  mutations: {
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList')||'[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '外卖');
        store.commit('createTag', '网购');
        store.commit('createTag', '出行');
        store.commit('createTag', '娱乐');
      }
    },

    saveTags(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList));
    },



    setCurrentTag(state,id:string){
      state.currentTag = state.tagList.filter(item=> item.id===id )[0];
    },

    setCurrentRecord(state,id:string){
      state.currentRecord = state.recordList.filter(item=> item.id===id)[0];
    },

    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },

    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },

    removeRecord(state,id:string){
      console.log("removeRecord done");
      let index = -1;
      for(let i=0;i<state.recordList.length;i++){
        if(state.recordList[i].id===id){
          index = i;
          break;
        }
      }
      if(index>=0){
        state.recordList.splice(index,1);
        store.commit('saveRecords');
        router.back();
      }else{
        window.alert('删除记账记录失败');
      }
    },

    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },

    saveRecords(state) {
      window.localStorage.setItem('recordList',
          JSON.stringify(state.recordList));
    },

    createTag(state,name:string){
      const names = state.tagList.map(item=>item.name);
      if(names.indexOf(name)>=0) return window.alert('标签已存在');
      const id = createId().toString();
      state.tagList.push({id,name});
      store.commit('saveTags');
      return;
    },

    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.id = createId().toString();
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords');
      //window.alert("已保存啦");
    },



  }
});

export default store;