import {Fragment,useState} from "react"
import { useEffect } from "react"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {createNewProduct} from '../../actions/productsAction'
import {isCreatedClear,clearError} from '../../slices/productsSlice'
import {toast} from "react-toastify"
export default function CreateProduct(){
    const {product,isCreated,error}=useSelector(state=>state.productsState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [description,setDescription]=useState('')
    const [stock,setStock]=useState('')
    const [seller,setSeller]=useState('')
    const [image,setImage]=useState([])
    const [imagePreview,setImagePreview]=useState([])
    const categoryArray=[
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]
    console.log("img",image)
    console.log("Pre",imagePreview)
    function imageHandler(e){
       const files= Array.from(e.target.files)
       console.log("Files",files)
       if(files){
        files.map(file=>{
            setImage([...image,file]);
            return setImagePreview([...imagePreview,URL.createObjectURL(file)])
    })
       }

    }
    function submitHandler(e){
        e.preventDefault()
        const formData=new FormData();
        formData.append('name',name)
        formData.append('price',price)
        formData.append('description',description)
        formData.append('category',category)
        formData.append('seller',seller)
        formData.append('stock',stock)
        image.forEach(img=>{
            formData.append("images",img)
        })
        dispatch(createNewProduct(formData))
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:'top-center',
                onOpen:()=>{
                    dispatch(clearError())
                }
            })
            return
        }
        if(isCreated){
            toast.success("Product Created Successfuly",{
                position:'top-center',
                onOpen:()=>{
                    dispatch(isCreatedClear())
                }
            })
            
            navigate('/')
        }
    },[dispatch,clearError,isCreated])
    return(
        <Fragment>
                    <div className="auth-body text-dark">
                        <form onSubmit={submitHandler} className="auth-container">
                            <h1 className='text-dark'>Create Product</h1>
                            
                            
                                <div className="input-field me-3">
                                    <input type="text" placeholder="Name" onChange={e=>setName(e.target.value)} />
                                    <label htmlFor="" >Name</label>
                                </div>
                                <div className="input-field">
                                    <input type="number" placeholder="Price" onChange={e=>setPrice(e.target.value)}  />
                                    <label htmlFor="" >Price</label>
                                </div>
                                <div className="input-field">
                                    <textarea placeholder="Enter Description...." onChange={e=>setDescription(e.target.value)} className="w-100 p-1">

                                    </textarea>
                                    
                                </div>
                                
                                <select 
                                onChange={e=>setCategory(e.target.value)}
                                className="input-field">
                                    <option>Select Category</option>
                                    {
                                        categoryArray.map(item=>(
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                                
                                <div className="input-field">
                                    <input type="text" placeholder="Seller" onChange={e=>setSeller(e.target.value)} />
                                    <label htmlFor="" >Seller</label>
                                </div>
                                <div className="input-field">
                                    <input type="number" placeholder="Stock" onChange={e=>setStock(e.target.value)} />
                                    <label htmlFor="" >Stock</label>
                                </div>
                                    
                                <div className="input-field">
                                    <input type="file" placeholder="Image" onChange={imageHandler} />
                                </div>
                                <div className="img-preview d-flex">
                                    {
                                        imagePreview.map(img=>(
                                            
                                            <img src={img} height='50' width='50'/>
                                        ))
                                    }
                                </div>
                            <button >Create</button>
                        </form>
                    </div>
                </Fragment>
        
    )
}