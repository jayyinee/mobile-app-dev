//individual iamge to be renderend in list

const ImageItem = (props) => {
  const {image} = props
  return (
  <div>
    <img src={image.urls.small} alt={image.alt_description} />
  </div>
  )
}

export default ImageItem
