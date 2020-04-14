import fire from "./fire";

const db = fire.firestore();

export default class Store {
  storenewUser = async data => {
    //Create the user in firebase.
    //User the userID to create the user information in the database.

    db.collection("users")
      .doc(data.newUserID)
      .set({
        name: data.name,
        username: data.username,
        email: data.email,
        encrypted_password: data.encrypted_password,
        userID: data.newUserID
      })
      .catch(function(error) {
        console.error("Error writing new user data to the db: ", error);
      });
  };

  addPost = async data => {
    const postCollectionRef = db.collection(data.category);
    var today = new Date();

    postCollectionRef
      .add({
        //MAKE SURE THIS IS THE SAME AS
        title: data.title,
        category: data.category,
        content: data.content,
        likes: 0,
        views: 0,
        numComments: 0,
        username: "Jenny",
        timestamp: today.getTime()
      })
      .then(docRef => {
        db.collection(data.category)
          .doc(docRef.id)
          .set(
            {
              documentID: docRef.id
            },
            { merge: true }
          );

        db.collection("posts")
          .doc(docRef.id)
          .set({
            //THIS EXCEPT THE DOCUMENT ID
            documentID: docRef.id,
            title: data.title,
            category: data.category,
            content: data.content,
            likes: 0,
            views: 0,
            numComments: 0,
            username: "Jenny",
            timestamp: today.getTime()
          })
          .catch(function(error) {
            console.error("Error writing documents in post: ", error);
          });
      })
      .catch(function(error) {
        console.error("Error writing document in the categories: ", error);
      });
  };

  //Get Methods
  getPosts = async () => {
    var data = [];
    await db
      .collection("posts")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          data.push(doc.data());
        });
      });
    return data;
  };
  getComments = async id => {
    var data = [];
    await db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          data.push(doc.data());
        });
      });
    return data;
  };
  addComment = data => {
    var today = new Date();

    const commentCollectionRef = db
      .collection("posts")
      .doc(data.id)
      .collection("comments");
    commentCollectionRef
      .add({
        user: "Uma", // change later
        text: data.commentText,
        likes: 0,
        timestamp: today.getTime()
      })
      .catch(function(error) {
        console.error("Error writing document in the categories: ", error);
      });
  };

  getCategories = async () => {
    var data = [];
    await db
      .collection("categories")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          data.push(doc.data());
        });
      });
    return data;
  };

  getSpecificCategory = async category => {
    var data = [];
    await db
      .collection(category)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          data.push(doc.data());
        });
      });
    return data;
  };

  updatePost = async post => {
    await db
      .collection("posts")
      .where("documentID", "==", post.documentID)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // Build doc ref from doc.id
          db.collection("posts")
            .doc(doc.id)
            .update({
              likes: post.likes,
              views: post.views,
              numComments: post.numComments ? post.numComments : 0
            });
        });
      });
  };

  updateComment = async (postId, comment) => {
    console.log(comment);
    await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(comment.documentID)
      .update({
        likes: comment.likes
      });
  };
}
