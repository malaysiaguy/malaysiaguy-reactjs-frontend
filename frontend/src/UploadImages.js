import axios from 'axios'
const API_URL = '/api/upload/'

const UploadImages = () => {

    const onSelectFile = async (e) => {
        const file = e.target.files[0]
        const convertedFile = await convertToBase64(file)

        //Request will be sent from here
        const s3URL = await axios.post(
            API_URL, {
                image: convertedFile,
                imageName: file.name
            }
        )
    }
    const convertToBase64 = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result)
            }
        })
    }

    return (
        <input type='file' accept='image/*' onChange={onSelectFile} />
    )
}

export default UploadImages