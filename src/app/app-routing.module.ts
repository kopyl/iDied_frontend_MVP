import { RouterModule } from "@angular/router"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { UnauthorizedComponent } from "@components/unauthorized"
import { NotesComponent } from "@components/notes"
import { NotFoundComponent } from "@components/not-found"
import { MainPageComponent } from "@components/main-page"

const routes = [
    {
        path: "",
        component: MainPageComponent,
    },
    {
        path: "unauthorized",
        component: UnauthorizedComponent,
    },
    {
        path: "notes",
        component: NotesComponent,
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
