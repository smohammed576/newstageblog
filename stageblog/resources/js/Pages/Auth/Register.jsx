import GreenButton from "@/Components/GreenButton";
import InputWithShadow from "@/Components/Input";
import { useForm } from "@inertiajs/react";

function RegisterScreen(){
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
        image: ''
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation')
        });
    };

    return (
        <main className="main__auth">
            <section className="auth">
                <figure className="auth__figure"></figure>
                <form onSubmit={submit} className="auth__form">
                    <h2 className="auth__form--text">JOIN STAGEBLOG</h2>
                    <InputWithShadow label="Email address" type={'email'} value={data.email} onChange={(event) => setData('email', event.target.value)} whiteInput={true}/>
                    <span className="auth__form--wrapper">
                    <InputWithShadow label="Username" value={data.name} onChange={(event) => setData('name', event.target.value)} whiteInput={true}/>
                    <InputWithShadow label="Image" value={data.image} onChange={(event) => setData('image', event.target.value)} whiteInput={true}/>
                    </span>
                    <InputWithShadow label="Password" type={'password'} value={data.password} onChange={(event) => setData('password', event.target.value)} whiteInput={true}/>
                    <InputWithShadow label="Confirm password" type={'password'} value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)} whiteInput={true}/>
                    <GreenButton processing={processing} text="SIGN UP"/>
                </form>
            </section>
        </main>
    );
}

export default RegisterScreen;