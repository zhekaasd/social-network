import React from "react";
import styles from "./formContorl.module.css";
import {WrappedFieldsProps} from "redux-form";



/*---Компонента, которая передается в другую специальную компоненту из библиотеки redux-form, в качестве отображаемого элемента---*/
/*---!!!---Необходимо "раскукожить" пропсы с помощью REST-оператора, иначе мы не сможем считать данные из формы---!!!---*/
export const Textarea: React.FC<WrappedFieldsProps> = ({input, meta, ...props}) => {

    /*---Помещаем в переменную ошибки, которые будем использовать как условие для отображения нужных элементов---*/
    const hasError = meta.error && meta.touched;

    /*---Возвращаем элемент, который и будет отображаться в специальной компоненте Field---*/
    return <div className={styles.formControl + ' ' + ( hasError && styles.error)}>
        <div>
            <textarea {...input} {...props} />
        </div>

    {/*---Если условия ошибки будут выполнены, то мы вернём текст с ошибкой---*/}
        { hasError && <span>{meta.error}</span> }
    </div>
}


/*---Компонента, которая передается в другую специальную компоненту из библиотеки redux-form, в качестве отображаемого элемента---*/
/*---!!!---Необходимо "раскукожить" пропсы с помощью REST-оператора, иначе мы не сможем считать данные из формы---!!!---*/
export const Input: React.FC<WrappedFieldsProps> = ({input, meta, ...props}) => {

    /*---Помещаем в переменную ошибки, которые будем использовать как условие для отображения нужных элементов---*/
    const hasError = meta.error && meta.touched;

    /*---Возвращаем элемент, который и будет отображаться в специальной компоненте Field---*/
    return <div className={styles.formControl + ' ' + ( hasError && styles.error)}>
        <div>
            <input {...input} {...props} />
        </div>

    {/*---Если условия ошибки будут выполнены, то мы вернём текст с ошибкой---*/}
        { hasError && <span>{meta.error}</span> }

    </div>
}