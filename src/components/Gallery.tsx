import { useState } from "react"
import { handlePostReaction } from "../lib/api"
import { BASE_URL } from "../lib/constant"
import { IAccount, IPost } from "../lib/types"
import { Post } from "./Post"

interface IProps {
    posts : IPost[],
    onUpdatePost? : (id : number) => void,
    account : IAccount
}
export const Gallery:React.FC<IProps> = ({posts, account, onUpdatePost}) => {

    const [currentPost, setCurrentPost] = useState<number>(-1);

    const reactPost = (id: number) => {
        handlePostReaction(id)
        .then(response => {
            console.log(response);
            
            if (onUpdatePost) {
                onUpdatePost(id)
            }
        })
    }
    return <div className="list">
        <h2 style={{textAlign:"center"}}>{posts?.length} posts</h2>
        <div className="list">
            {
                posts?.map(post => 
                    <div key={post.id} className="post-container">
                        <img 
                            src={BASE_URL + post.picture}
                            className="post-img"
                        />
                        <div className="cover" onClick={() => setCurrentPost(post.id)}></div>
                        <img 
                            onClick={() => reactPost(post.id)}
                            src={
                                post.isLiked 
                                ? "https://cdn0.iconfinder.com/data/icons/sweets/119/heart_love_pink.png"
                                : "https://cdn0.iconfinder.com/data/icons/sweets/119/heart_love_white.png"
                            }
                            className="like-btn" 
                        />
                    </div>
                )
            }
        </div>
        {currentPost != -1 && <Post handleClose={() => setCurrentPost(-1)} postId={currentPost} account = {account}/>}
    </div>
}