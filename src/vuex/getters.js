export default{
    loginStatus:(state) => {
        return !!state.st && !!state.sid;
    },
    getIdentity:(state)=> {
        var st = state.st;
        var sid = state.sid;
        return { st,sid }
    }
};