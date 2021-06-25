const storage = {
    setVal: (val) => {
        console.table(val)
        localStorage.setItem(val.title,val.val);
    },
    getVal: (key) => {
       let val = localStorage.getItem(key);
       return val;
    }

}

export default storage;