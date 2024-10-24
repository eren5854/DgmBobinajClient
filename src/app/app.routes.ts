import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { GalleryComponent } from './components/gallery/gallery.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children:[
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "comment-item/:id",
                component: CommentItemComponent
            },
            {
                path: "gallery",
                component: GalleryComponent
            }
        ]
    }
];
