import Post from "./Post";


export default function PostMap({posters}, clicks) {
    if (posters.postName === '') {
        posters.postName = "anonymous";
    }


    return (
        <div className="cards">

        {posters.map(s => {
                if (s.timePosted === "2021") {
                    return <Post key={s.postNumber} postName={s.postName} postTopic={s.postTopic} postBody={s.postBody} postNumber={s.postNumber} postVisibility={s.postVisibility} postNumberReplies={s.postReplies.length} timePosted={s.timePosted}/>
                }
                if (s.postVisibility) {
                    return <Post key={s.postNumber} postName={s.postName} postTopic={s.postTopic} postBody={s.postBody} postNumber={s.postNumber} postVisibility={s.postVisibility} postNumberReplies={s.postReplies.length} timePosted={s.timePosted}/>
                }

        })}
        </div>

    )
}