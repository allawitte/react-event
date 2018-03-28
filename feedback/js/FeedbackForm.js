'use strict';
const FeedbackForm = (props)=> {
    const data = {
        salutation: props.data.salutation,
        name: '',
        subject: props.data.subject,
        message: '',
        email: '',
        snacks: props.data.snacks
    };
    const salutationArr = [
        {key: 'mr', value: 'Мистер', title: 'Мистер'},
        {key: 'mrs', value: 'Мисис', title: 'Мисис'},
        {key: 'ms', value: 'Мис', title: 'Мис'}
    ];
    const snacksArr = [
        {key: 'pizza', value: 'пицца', title: 'Пиццу'},
        {key: 'cake', value: 'пирог', title: 'Пирог'},
    ];
    const getChoice = (choice, inputType) => {
        return (e=>{
            if(inputType == 'radio'){
                data[choice]=e.target.value;
            }
            if(inputType == 'checkbox'){
                let inArray = data[choice].indexOf( e.target.value);
                if(inArray == -1){
                    data[choice].push(e.target.value);
                }
                else {
                    data[choice].splice(inArray, 1);
                }
            }
        });
    };
    const snacks = [];
    const salutations = [];
    const makeInputsBlock = (fromArr, toArr, param, inputType, inputName) => {
        const classInput = 'contact-form__input contact-form__input--'+inputType;
        const classLabel = 'contact-form__label contact-form__label--'+inputType;
        const checkParam =(param, item) =>{
            if(Array.isArray(param)){
                if(param.indexOf(item) >-1){
                    return true;
                }
            }
            else {
                if(param === item){
                    return true;
                }
            }
            return false
        }
        for(let i = 0; i < fromArr.length; i ++){
        let forId = inputName+'-'+fromArr[i].key;
        if(checkParam(param,fromArr[i].value)) {
            toArr.push(<input className={classInput}
                                    id={forId} name={inputName}
                                    type={inputType}
                              onChange={getChoice(inputName, inputType)}
                                    defaultChecked
                                    value={fromArr[i].value}/>)
        }
        else {
            toArr.push(<input className={classInput}
                                    id={forId} name={inputName}
                                    type={inputType}
                              onChange={getChoice(inputName, inputType)}
                                    value={fromArr[i].value}/>)
        }
        toArr.push(<label className={classLabel}
                       for={forId}>{fromArr[i].title}</label>);



    }};
    makeInputsBlock(salutationArr, salutations, props.data.salutation, 'radio', 'salutation');
    makeInputsBlock(snacksArr, snacks, props.data.snacks, 'checkbox', 'snacks');
    const selectOptArr = ['У меня проблема', 'У меня важный вопрос'];
    let selectOptDef = props.data.subject;
    const selectOpt = selectOptArr.map((item, index )=>{
        if (item == props.data.subject){
            selectOptDef = props.data.subject;
        }
            return <option>{item}</option>;
    });

    const getName = (e)=> {
        data.name = e.target.value;
    };
    const getEmail = (e)=> {
        data.email = e.target.value;
    };
    const getMsg = (e)=> {
        data.message = e.target.value;
    };
    const getSubject = (e)=> {
        data.subject = e.target.value;
    };

    const onSubmit = (e)=> {
        e.preventDefault();
        document.getElementById('result').textContent = JSON.stringify(data);
    }
    return <form className="content__form contact-form">
        <div className="testing">
            <p>Чем мы можем помочь?</p>
        </div>
        <div className="contact-form__input-group">
                {salutations}
        </div>
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="name">Имя</label>
            <input className="contact-form__input contact-form__input--text" onBlur={getName} id="name" name="name" type="text" placeholder={props.data.name}/>
        </div>
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="email">Адрес электронной почты</label>
            <input className="contact-form__input contact-form__input--email" onBlur={getEmail} id="email" name="email" type="email" placeholder={props.data.email}/>
        </div>
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="subject">Чем мы можем помочь?</label>
            <select className="contact-form__input contact-form__input--select" onBlur={getSubject} id="subject" name="subject" defaultValue={selectOptDef}>
                {selectOpt}
            </select>
        </div>
        <div className="contact-form__input-group">
            <label className="contact-form__label" htmlFor="message">Ваше сообщение</label>
            <textarea className="contact-form__input contact-form__input--textarea" onBlur={getMsg} id="message" name="message" rows="6" cols="65">{props.data.message}</textarea>
        </div>
        <div className="contact-form__input-group">
            <p className="contact-form__label--checkbox-group">Хочу получить:</p>
            {snacks}
        </div>
        <button className="contact-form__button" type="submit" onClick={onSubmit}>Отправить сообщение!</button>
        <output id="result" />
    </form>
}
