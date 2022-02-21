import { RouterModule } from "@angular/router"
import { NotesComponent } from "./notes/notes.component"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { MainPageComponent } from "./main-page/main-page.component"

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
