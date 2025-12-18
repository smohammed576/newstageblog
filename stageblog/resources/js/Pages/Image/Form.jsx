import GreenButton from "@/Components/GreenButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

function ImageForm(){
    const path = usePage().props.flash.status;
    const { data, setData, processing, reset, post } = useForm({
        image: ''
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('images.store', 'images'), {
            forceFormData: true
        });
    }

    const copyPath = () => {
        navigator.clipboard.writeText(`storage/${path}`);
    }
    return (
        <AuthenticatedLayout>
            <Head title="Upload an image"/>
            <section className="newimage">
                <form onSubmit={submit} encType={path != null ? "" : "multipart/form-data"} className="newimage__form">
                    <figure className="newimage__form--wrapper">
                        {
                            path != null ? 
                                <img src={`/storage/${path}`} alt="" className="newimage__form--image" />
                            :
                                <label htmlFor="" className="newimage__form--label">
                                    Select your image 
                                    <input type="file" onChange={(event) => setData('image', event.target.files[0])} className="newimage__form--input" />
                                </label>
                        }
                    </figure>
                    <span className="newimage__form--footer">
                        <GreenButton processing={path != null ? false : data.image != '' ? processing : true} type={path != null ? 'button' : 'submit'} onClick={copyPath} text={path != null ? 'Copy path' : 'UPLOAD'} />
                    </span>
                </form>
            </section>
        </AuthenticatedLayout>
    );

}

export default ImageForm;