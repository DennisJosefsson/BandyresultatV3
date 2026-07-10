const Comment = ({ comment }: { comment: string }) => {
  return (
    <p className="p-1 text-[8px] md:text-xs">{comment}</p>
  )
}

export default Comment
