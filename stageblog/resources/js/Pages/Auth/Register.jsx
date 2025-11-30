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
                    <div className="auth__form--item">
                        <label htmlFor="" className="auth__form--item-label">Email address</label>
                        <input type="email" name="email" value={data.email} onChange={(event) => setData('email', event.target.value)} className="auth__form--item-input" />
                    </div>
                    <span className="auth__form--wrapper">
                        <div className="auth__form--item">
                            <label htmlFor="" className="auth__form--item-label">Username</label>
                            <input type="text" name="name" value={data.name} onChange={(event) => setData('name', event.target.value)} className="auth__form--item-input" />
                        </div>
                        <div className="auth__form--item">
                            <label htmlFor="" className="auth__form--item-label">Image</label>
                            <input type="text" name="image" value={data.image} onChange={(event) => setData('image', event.target.value)} className="auth__form--item-input" />
                        </div>
                    </span>
                    <div className="auth__form--item">
                        <label htmlFor="" className="auth__form--item-label">Password</label>
                        <input type="password" name="password" value={data.password} onChange={(event) => setData('password', event.target.value)} className="auth__form--item-input" />
                    </div>
                    <div className="auth__form--item">
                        <label htmlFor="" className="auth__form--item-label">Confirm password</label>
                        <input type="password" name="password_confirmation" value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)} className="auth__form--item-input" />
                    </div>
                    <button disabled={processing} className="newpost__form--footer-button">SIGN UP</button>
                </form>
            </section>
        </main>
    );
}

export default RegisterScreen;