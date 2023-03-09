import { useState, useEffect } from 'react'
import { FaImage } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { storage } from '../firebase'
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from 'firebase/storage'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'

//const db = app.firestore()

function ImageUploader() {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.users)
    const [state, setState] = useState(user)
    const [modal, setModal] = useState(false)
    const [msg, setMsg] = useState(null)
    const [category, setCategory] = useState(null)
    const [filename, setFilename] = useState(null)
    const [imageUpload, setImageUpload] = useState(null)
    const [imageUrls, setImageUrls] = useState([])
    const imagesListRef = ref(storage, 'awards/')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleToggle = () => {
        setModal(!modal)
    }
    let isVisible = false

    useEffect(() => {
        const userData = {
            email: 'malaysiaguy@aliyun.com',
            password: '123456'
        }
        setState(userData)

        dispatch(login(userData))
    }, [dispatch])
/*
    useEffect(() => {
        listAll(imagesListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url])
                })
            })
        })
        const fetchAwards = async () => {
            const awardsCollection = await db.collection('profile').get()
            setAwards(awardsCollection.docs.map((doc) => {
                return doc.data()
            })
        )}
        fetchAwards()
    }, [])

    const onFileChange = async (e) => {
//        setState({
//            selectedFile: e.target.files[0]
//        })
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
//        await fileRef.put(file).then(() => {
//            console.log('Uploaded file', file.name)
//        })
        setFileUrl(await fileRef.getDownloadURL())
    }

    fileUploadHandler = () => {
        const fd = new formData()
        fd.append('image', state.selectedFile, state.selectedFile.name)
        axios.post('https://xxxx/uploadFile', fd, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        })
            .then(res => {
                console.log(res)
            })
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
*/
    const onSubmit = (e) => {
        e.preventDefault()

        console.log('imageUpload category - ')
        console.log(category)
        if(!imageUpload) return

        const imageRef = ref(storage, `awards/${category}-${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url])
            })
        })

/*        db.collection('profile').doc('awards').set({
            user_id: id,
            category: category,
            filename: filename,
            photo: imageUpload
        })*/
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
    <div>
        <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
            <FaImage /> Upload Image
        </NavLink>
        <Modal fade={true} isOpen={modal} toggle={handleToggle}>
            <ModalBody>
            <ModalHeader toggle={handleToggle}><FaImage /> Upload Image</ModalHeader>
                { msg ? <Alert color='danger'>{msg}</Alert> : null }
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for='category'>Category</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='category'
                            name='category'
                            value={category}
                            placeholder='Enter the category'
                            onChange={(e) => {
                                 setCategory(e.target.value)
                            }}
                        />
                        <Label for='filename'>File Name</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='filename'
                            name='filename'
                            value={filename}
                            placeholder='Enter the file name'
                            onChange={(e) => {
                                 setFilename(e.target.value)
                            }}
                        />
                        <Input
                            type='id'
                            className='form-control'
                            id='id'
                            name='id'
                            value={user._id}
                            style={{display: 'none'}}
                            onChange={(e) => e.target.value}
                        />
                        <Input
                            type='file'
                            className='form-control'
                            id='photo'
                            name='photo'
//                            value={photo}
                            placeholder='Select the image file'
//                            style={{display: 'none'}}
//                            onChange={onFileChange}
                            onChange={(e) => {
                                setImageUpload(e.target.files[0])
                            }}
//                            ref={fileInput => this.fileInput = fileInput}
                        />
{/*                        <Button color='dark' style={{ marginTop: '2rem' }} block
                            onClick={() => fileInput.click()}
                        >
                            Choose Image
                        </Button> */}
                        <Button color='dark' style={{ marginTop: '2rem' }} block
//                            onClick={fileUploadHandler}
                        >
                            Upload
                        </Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    {/*
        imageUrls.map((url, key) => {
            return <img key={key} width='100' height='100' src={url} alt={url}></img>
        })
    */}
    </div>
    )
}

export default ImageUploader