import { BASE_URL } from "../lib/constant"
import { IPost } from "../lib/types"

interface IProps {
    posts : IPost[],
}
export const Gallery:React.FC<IProps> = ({posts}) => {
    return <>
        <h2 style={{textAlign:"center"}}>{posts?.length} posts</h2>
        <div className="list">
            {
                posts?.map(post => 
                    <div key={post.id}>
                        <img 
                            src={BASE_URL + post.picture}
                        />
                        <p>{post.title}</p> 
                    </div>
                )
            }
        </div>
    </>
}