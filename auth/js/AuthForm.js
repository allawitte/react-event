'use strict';
const AuthForm = ()=> {
    const user = {};
    const fillUser = (key) => {
        return (
            e => {
                user[key] = e.target.value;
            }
        )
    }
    const preventSubmit = e => { if(e.keyCode == 13){e.preventDefault(); }};
    const checkPass = e => {
        if(!(/[a-z0-9\_]/i.test(e.key))){
            e.preventDefault();
        }
    }
    const checkEmail = e => {
        if(!(/[a-z0-9\@\.\_\-]/i.test(e.key))){
            e.preventDefault();
        }
    };
    const sendUser = e => {
        e.preventDefault();
        console.log('user', user);
    }
    return (<form className="ModalForm" action="/404/auth/" method="POST">
        <div className="Input">
            <input required type="text" placeholder="Имя" onKeyDown={preventSubmit} onChange={fillUser('name')}/>
                <label></label>
        </div>
        <div className="Input">
            <input type="email" placeholder="Электронная почта" onKeyUp={checkEmail} onKeyDown={preventSubmit} onChange={fillUser('email')}/>
                <label></label>
        </div>
        <div className="Input">
            <input required type="password" placeholder="Пароль" onKeyUp={checkPass} onKeyDown={preventSubmit} onChange={fillUser('password')}/>
                <label></label>
        </div>
        <button type="submit" onClick={sendUser}>
            <span>Войти</span>
            <i className="fa fa-fw fa-chevron-right"></i>
        </button>
    </form>);
}
//
