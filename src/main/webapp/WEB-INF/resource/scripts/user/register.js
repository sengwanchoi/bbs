window.addEventListener('DOMContentLoaded', () => {
    const registerForm = window.document.getElementById('register-form');
    registerForm['addressPostButton'].addEventListener('click', () => {
      new daum.Postcode({
          oncomplete: (data) => {
              registerForm['addressPost'].value = data['zonecode'];
              registerForm['addressPrimary'].value = data['address'];
              registerForm['addressSecondary'].value = '';
              registerForm['addressSecondary'].focus();
          }
      }).open();
    });

    registerForm['email'].addEventListener('focusout', () => {
        const callback = (resp) => {
            const respJson = JSON.parse(resp);
            const emailWarning = registerForm.querySelector('[rel="email-warning"]');
            if (respJson['count'] === 0) {
                emailWarning.classList.remove('visible');
            } else {
                emailWarning.classList.add('visible');
            }
        };
        const formData = new FormData();
        formData.append('field', 'e');
        formData.append('value', registerForm['email'].value);
        Ajax.request('POST', '/apis/count', callback, () => {}, formData);
    });

    registerForm['nickname'].addEventListener('focusout', () => {
        const callback = (resp) => {
            const respJson = JSON.parse(resp);
            const nicknameWarning = registerForm.querySelector('[rel="nickname-warning"]');
            if (respJson['count'] === 0) {
                nicknameWarning.classList.remove('visible');
            } else {
                nicknameWarning.classList.add('visible');
            }
        };
        const formData = new FormData();
        formData.append('field', 'n');
        formData.append('value', registerForm['nickname'].value);
        Ajax.request('POST', '/apis/count', callback, ()=>{}, formData);
    });

    registerForm.onsubmit = () => {
        const emailRegex = new RegExp('^(?=.{8,50}$)([0-9a-z]([_]?[0-9a-z])*?)@([0-9a-z][0-9a-z\\-]*[0-9a-z]\\.)?([0-9a-z][0-9a-z\\-]*[0-9a-z])\\.([a-z]{2,15})(\\.[a-z]{2})?$');
        const passwordRegex = new RegExp('^([0-9a-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:\'\",<.>/?]{4,100})$');
        const nicknameRegex = new RegExp('^([0-9a-zA-Z???-???]{2,10})$');
        const nameFirstRegex = new RegExp('^([???-???]{1,10})$');
        const nameOptionalRegex = new RegExp('^([???-???]{0,10})$');
        const nameLastRegex = new RegExp('^([???-???]{1,10})$');
        const contactFirstRegex = new RegExp('^(010|070)$');
        const contactSecondRegex = new RegExp('^([0-9]{4})$');
        const contactThirdRegex = new RegExp('^([0-9]{4})$');
        const addressPostRegex = new RegExp('^([0-9]{5})$');
        const addressPrimaryRegex = new RegExp('^([0-9a-zA-Z???-???\\- ]{10,100})$');
        const addressSecondaryRegex = new RegExp('^([0-9a-zA-Z???-???\\- ]{0,100})$');
        if (!emailRegex.test(registerForm['email'].value)) {
            alert('????????? ???????????? ??????????????????.');
            registerForm['email'].focus();
            return false;
        }
        if (!passwordRegex.test(registerForm['password'].value)) {
            alert('????????? ??????????????? ??????????????????.');
            registerForm['password'].focus();
            return false;
        }
        if (!nicknameRegex.test(registerForm['nickname'].value)) {
            alert('????????? ???????????? ??????????????????.');
            registerForm['nickname'].focus();
            return false;
        }
        if (!nameFirstRegex.test(registerForm['nameFirst'].value)) {
            alert('????????? ????????? ???????????????.');
            registerForm['nameFirst'].focus();
            return false;
        }
        if (!nameLastRegex.test(registerForm['nameLast'].value)) {
            alert('????????? ????????? ???????????????.');
            registerForm['nameLast'].focus();
            return false;
        }
        if (!contactFirstRegex.test(registerForm['contactFirst'].value)) {
            alert('????????? ???????????? ??????????????????.');
            registerForm['contactFirst'].focus();
            return false;
        }
        if (!contactSecondRegex.test(registerForm['contactSecond'].value)) {
            alert('????????? ???????????? ??????????????????.');
            registerForm['contactSecond'].focus();
            return false;
        }
        if (!contactThirdRegex.test(registerForm['contactThird'].value)) {
            alert('????????? ???????????? ??????????????????.');
            registerForm['contactThird'].focus();
            return false;
        }
        if (!addressPostRegex.test(registerForm['addressPost'].value)) {
            alert('????????? ??????????????????.');
            registerForm['addressPost'].focus();
            return false;
        }
        if (!addressPrimaryRegex.test(registerForm['addressPrimary'].value)) {
            alert('????????? ??????????????????.');
            registerForm['addressPrimary'].focus();
            return false;
        }


        if (registerForm['password'].value !== registerForm['passwordCheck'].value) {
            alert('??????????????? ?????? ???????????? ????????????.')
            registerForm['passwordCheck'].focus();
            return false;
        }
    }

});