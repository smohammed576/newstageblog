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
                    <div className="auth__form--item">
                        <label htmlFor="" className="auth__form--item-label">Email address</label>
                        <input type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} className="auth__form--item-input" />
                    </div>
                    <div className="auth__form--item">
                        <label htmlFor="" className="auth__form--item-label">Password</label>
                        <input type="password" value={data.password} onChange={(event) => setData('password', event.target.value)} className="auth__form--item-input" />
                    </div>
                    <span className="auth__form--remember">
                        <input type="checkbox" name="remember" checked={data.remember} onChange={(event) => setData('remember', event.target.checked)} className="auth__form--remember-checkbox" />
                        <label htmlFor="" className="auth__form--remember-label">Remember me</label>
                    </span>
                    <button disabled={processing} className="newpost__form--footer-button">SIGN IN</button>
                </form>
            </section>
        </main>
    );
}

export default LoginScreen;