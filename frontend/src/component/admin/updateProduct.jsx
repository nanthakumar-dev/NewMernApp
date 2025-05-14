import {Fragment,useState} from "react"
import { useEffect } from "react"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate,useParams} from "react-router-dom"
import {getSingleProduct,updateProduct} from '../../actions/productsAction'
import {clearError,isUpdatedClear} from '../../slices/productsSlice'
import {toast} from "react-toastify"
export default function CreateProduct(){
    const {product,isCreated,error,isUpdated}=useSelector(state=>state.productsState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [description,setDescription]=useState('')
    const [stock,setStock]=useState('')
    const [seller,setSeller]=useState('')
    const[image,setImage]=useState([])
    const[imagePreview,setImagePreview]=useState([])
    const[isImageCleared,setIsImageCleared]=useState("no")
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
   function imageHandler(e){
        let files=Array.from(e.target.files)
        files.map((file)=>{
            setImage(pre=>[...pre,file])
            setImagePreview(pre=>[...pre,URL.createObjectURL(file)])
        })
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
        formData.append('isImageCleared',isImageCleared)
        image.forEach(img=>{
            formData.append('images',img)
        })
        dispatch(updateProduct(id,formData))
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
        if(isUpdated){
            toast.success("Product Updated Successfuly",{
                position:'top-center',
                onOpen:()=>{
                    dispatch(isUpdatedClear())
                }
            })
            
        }
        dispatch(getSingleProduct(id))
    },[dispatch,clearError,isUpdated])
    console.log(image)
    useEffect(()=>{
        if(product){
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setSeller(product.seller)
            setStock(product.stock)
            setCategory(product.category)
            let images=[]
            product.images.map(img=>{
                images.push(img.image)
            })  
            setImagePreview(images)  
        }
    },[product])
    function imageClearHandler(){
        setImage([])
        setImagePreview([])
        setIsImageCleared("yes")
    }
    return(
        <Fragment>
                    <div className="auth-body text-dark">
                        <form onSubmit={submitHandler} className="auth-container">
                            <h1 className='text-dark'>Update Product</h1>
                            
                            
                                <div className="input-field me-3">
                                    <input type="text" value={name} placeholder="Name" onChange={e=>setName(e.target.value)} />
                                    <label htmlFor="" >Name</label>
                                </div>
                                <div className="input-field">
                                    <input type="number" value={price}  placeholder="Price" onChange={e=>setPrice(e.target.value)}  />
                                    <label htmlFor="" >Price</label>
                                </div>
                                <div className="input-field">
                                    <textarea value={description} placeholder="Enter Description...." onChange={e=>setDescription(e.target.value)} className="w-100 p-1">

                                    </textarea>
                                    
                                </div>
                                
                                <select 
                                onChange={e=>setCategory(e.target.value)}
                                value={category}
                                className="input-field">
                                    <option>Select Category</option>
                                    {
                                        categoryArray.map(item=>(
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                                
                                <div className="input-field">
                                    <input value={seller} type="text" placeholder="Seller" onChange={e=>setSeller(e.target.value)} />
                                    <label htmlFor="" >Seller</label>
                                </div>
                                <div className="input-field">
                                    <input value={stock} type="number" placeholder="Stock" onChange={e=>setStock(e.target.value)} />
                                    <label htmlFor="" >Stock</label>
                                </div>
                                    
                                <div className="input-field">
                                    <input type="file" placeholder="Image" onChange={imageHandler} />
                                </div>
                                <div className="img-preview d-flex">
                                    <i className="fa fa-trash text-danger" onClick={imageClearHandler}></i>
                                    {
                                        imagePreview.map((img,index)=>(
                                            
                                            <img src={img} key={index} height='50' width='50'/>
                                        ))
                                    }
                                </div>
                            <button >Create</button>
                        </form>
                    </div>
                </Fragment>
        
    )
}