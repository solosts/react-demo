import { useRef } from 'react';
import { useImmer } from 'use-immer'

const loginFrom = () => {
  // 表单对象
  const formRef = useRef(null);
  // 其他状态
  const [state, setState] = useImmer({
    codeSrc: '',
    uuid: ''
  });
  // 响应式对象 - 表单对象
  const [formField, setFormField] = useImmer({
    user: 'admin',
    pass: 'admin123',
    code: '',
    whetherAutoLogin: false
  });

  // 获取验证码
  const getValidateCodeHandle = async () => {
    // 请求获取验证码 并设置验证码的图片以及验证码token
    // let res = await httpRequest('GET', '/captchaImage', {});
    // if (res.code == 200) {
    //   state.codeSrc = `data:image/jpeg;base64,${res.img}`;
    //   state.uuid = res.uuid;
    // }
    console.log('获取验证码');

  };
  // 提交表单
  const submitForm = () => {
    console.log('提交表单');
    // const form: any = unref(formRef);
    // if (!form) return;
    // form.validate((valid: any) => {
    //   if (valid) {
    //     submitHandle();
    //   }
    // });
  };
  // 提交请求
  const submitHandle = async () => {
    const params = {
      password: formField.pass,
      username: formField.user,
      code: formField.code,
      uuid: state.uuid
    };

    // 提交登陆请求
  };

  return {
    state,
    formRef,
    formField,
    getValidateCodeHandle,
    submitForm
  };
};

export default loginFrom;
