import Checkbox from "@/Components/Checkbox";
import GreenButton from "@/Components/GreenButton";
import InputWithShadow from "@/Components/Input";
import { useForm } from "@inertiajs/react";

function LoginScreen(){
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password')
        });
    };

    return (
        <main className="main__auth">
            <section className="auth">
                <figure className="auth__figure"></figure>
                <form onSubmit={submit} className="auth__form">
                    <h2 className="auth__form--text">WELCOME BACK</h2>
                    <InputWithShadow label="Email address" type={'email'} value={data.email} onChange={(event) => setData('email', event.target.value)} whiteInput={true}/>
                    <InputWithShadow label="Password" type={'password'} value={data.password} onChange={(event) => setData('password', event.target.value)} whiteInput={true}/>
                    <span className="auth__form--remember">
                        <Checkbox label="Remember me" value={data.remember} onChange={(event) => setData('remember', event.target.checked)}/>
                    </span>
                    <GreenButton text="SIGN IN" processing={processing}/>
                </form>
            </section>
        </main>
    );
}

export default LoginScreen;