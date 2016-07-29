import {Component} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Post} from "../api/model/Post";

@Component({
    selector: "my-app",
    template: `
<h1>Angular 2 + routing-controllers sample</h1>

<h2>List of posts loaded from API:</h2>
<div *ngIf="posts">
    <ul>
        <li *ngFor="let post of posts">
            <h3>{{ post.title }} <div style="float: right" (click)="remove(post)">[x]</div></h3>
            <p>{{ post.text }}</p>
            <ul *ngIf="post.categories">
               <li *ngFor="let category of post.categories">
                   {{ category.name }}
               </li>
            </ul>
        </li>
    </ul>
</div>

<div>
    <h2>Add a new post:</h2>
    <label>Title:</label> <input [(ngModel)]="newPost.title"/><br/>
    <label>Text:</label> <textarea [(ngModel)]="newPost.text"></textarea><br/>
    <button (click)="save()">save</button>
</div>

`
})
export class AppComponent {

    posts: Post[];
    newPost = new Post();

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.http
            .get("http://localhost:4000/posts")
            .map(response => response.json())
            .subscribe(posts => {
                this.posts = posts;
            });
    }

    save() {
        const options = { headers: new Headers({"Content-Type": "application/json"}) };
        this.newPost.id = this.posts.length + 1;
        this.http
            .post("http://localhost:4000/posts", JSON.stringify(this.newPost), options)
            .subscribe(() => {
                this.posts.push(this.newPost);
                this.newPost = new Post();
            });
    }

    remove(post: Post) {
        this.http.delete("http://localhost:4000/posts/" + post.id)
            .subscribe(() => {
                this.posts.splice(this.posts.indexOf(post), 1);
            });
    }

}