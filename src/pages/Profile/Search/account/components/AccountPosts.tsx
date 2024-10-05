import { IAccountProps } from "../../../../../lib/types"
import { Gallery } from "../../../../../components/Gallery";


export const AccountPosts:React.FC<IAccountProps> = ({account, setAccount}) => {

    const changePostStatus = (id: number) => {
        if (account) {
          const temp = {...account};
          const post = temp.posts?.find(p => p.id == id);
          if (post) {
            post.isLiked = !post.isLiked;
            setAccount(temp);
          }
        }
    }

    return ( 
            <div>
                { account?.isPrivate == "0" 
                  ?<Gallery onUpdatePost={changePostStatus} posts={account?.posts} account={account}/> 
                  : <div style={{display:"flex", justifyContent:"space-around", padding:"20px"}}>
                        <div style={{textAlign:"center"}}>
                            <img 
                                style={{height:"150px", width:"150px"}}
                                src="https://cdn0.iconfinder.com/data/icons/mix-pack-8/44/Asset_18-512.png" 
                            />
                            <p>This account is private</p>
                        </div>
                    </div>
                 }
            </div>
        )

}