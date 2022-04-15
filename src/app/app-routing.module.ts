import { RouterModule } from "@angular/router"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { UnauthorizedComponent } from "@components/unauthorized"
import { NotesComponent } from "@components/notes"
import { NotFoundComponent } from "@components/not-found"
import { MainPageComponent } from "@components/main-page"
import { NoteComponent } from "@components/notes/note"
import { SharingComponent } from "./components/sharing/sharing.component"

const routes = [
    {
        path: "",
        component: MainPageComponent,
        data: {
            animation: "isLeft"
        }
    },
    {
        path: "unauthorized",
        component: UnauthorizedComponent,
    },
    {
        path: "notes",
        component: NotesComponent,
        data: {
            animation: "isRight"
        },
        children: [
            {
                path: ':id',
                component: NoteComponent,
                children: [
                    {
                        path: 'sharing',
                        component: SharingComponent,
                    }
                ],
            },

        ],

    },
    {
        path: "**",
        component: NotFoundComponent,
    },
]

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
