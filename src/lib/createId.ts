let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;
window.onbeforeunload=function (){
    window.localStorage.setItem('_idMax',id.toString());
}
function createId() {
    id++;
    return id;
}

export default createId;