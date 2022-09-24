import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { GoogleAuthService } from '@services/auth'
import { snakeToCamelCaseArray } from '@utils/transformations'
import { RequestsService } from '@services/requests'
import { ActivatedRoute, NavigationEnd } from '@angular/router'
import { ViewChild, ElementRef } from '@angular/core'
import { noteItem, fadeInOut } from '@animations'
import { ConfirmPopupComponent } from '@components/confirmation-popup'
import { NoteComponent } from '@components/notes/note'
import { CookieService } from 'ngx-cookie-service'
import { ViewEncapsulation } from '@angular/core'

import { environment } from '@environment'
import { TooltipService } from '@services/tooltip'
import { GoogleAnalyticsService } from '@services/google-analytics'
import { LangService } from '@services/lang'
import mixpanel from 'mixpanel-browser'

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.sass'],
    animations: [noteItem, fadeInOut],
    encapsulation: ViewEncapsulation.None,
})
export class NotesComponent implements OnInit {
    paymentUrl = `${environment.apiUrl}payment`

    proStatus: boolean = true
    userHasSharedMoreThan3Notes: boolean = false

    notes: Array<frontendNote> = []
    activeNote: frontendNote
    formFocused: boolean
    notesEditing: boolean = false
    noteFromUrlId: string
    sharingInUrl: string
    selectedNoteIndex: number
    userClosedAtLeasOneNote: boolean
    firstLoadedIntoUI = false
    loaderVisible = true
    sharingView = false

    navigatedRoute$

    @ViewChild('notesListHTML') notesListHTML: ElementRef<HTMLDivElement>
    @ViewChild('confirmPopup') confirmPopup: ConfirmPopupComponent

    @ViewChild('note') note: NoteComponent

    constructor(
        public readonly googleAuth: GoogleAuthService,
        private pageTitle: Title,
        private router: Router,
        private readonly requests: RequestsService,
        private route: ActivatedRoute,
        private cookies: CookieService,
        public tooltip: TooltipService,
        public googleAnalytics: GoogleAnalyticsService,
        public lang: LangService
    ) {}

    ngOnInit(): void {
        // console.log(this.route.snapshot.url)

        this.googleAuth.accessControl()
        this.pageTitle.setTitle('iDied - Notes')
        this.fetchNotes()

        this.noteFromUrlId = this.router.parseUrl(
            this.router.url
        )?.root?.children['primary']?.segments[1]?.path

        this.handleiOSnavigateBySwipeLeft()

        if (!this.notes.length) {
            // id.doc.id#4
            this.router.navigate(['/notes'], {
                queryParamsHandling: 'preserve',
            })
        }

        this.findOutifUserClosedNoteAtLeastOnce()

        this.sharingInUrl = this.router.parseUrl(
            this.router.url
        )?.root?.children['primary']?.segments[2]?.path
    }

    findOutifUserClosedNoteAtLeastOnce() {
        let userClosedAtLeasOneNote = localStorage.getItem(
            'userClosedAtLeasOneNote'
        )
        userClosedAtLeasOneNote = JSON.parse(userClosedAtLeasOneNote!)
        this.userClosedAtLeasOneNote = userClosedAtLeasOneNote ? true : false
    }

    handleiOSnavigateBySwipeLeft() {
        this.router.events.subscribe((event: any) => {
            if (!(event instanceof NavigationEnd)) return

            if (event.url.includes('/sharing')) {
                this.sharingView = true
                return
            }

            this.sharingView = false

            if (event.url === '/notes') {
                this.notesEditing = false
            } else if (event.url && event.url.startsWith('/notes/')) {
                this.openMobileNote()
            }
        })
    }

    setSelectedNoteIndex() {
        if (this.noteFromUrlId) {
            this.selectedNoteIndex = this.notes.findIndex(
                (el) => el.id === this.noteFromUrlId
            )
        } else {
            this.selectedNoteIndex = this.notes.findIndex(
                (el) => el.id === this.activeNote.id
            )
        }
    }

    setActiveNote(addingNotesFromCreation = false): void {
        this.activeNote = this.notes[0]
        if (addingNotesFromCreation) return
        if (this.noteFromUrlId) {
            this.activeNote =
                this.notes.find((el) => el.id === this.noteFromUrlId) ??
                this.notes[0]
            this.openMobileNote()
            this.setSelectedNoteIndex()
        }
    }

    toggleFormFocus(): void {
        this.formFocused = !this.formFocused
    }

    downloadNotes(backendResponse: backend_init_notes_response) {
        this.addNotes(backendResponse, false)
    }

    createNoteInUI(backendResponse: backend_notes_response) {
        this.addNotes(backendResponse, true)
    }

    setProStatus(backendResponse: backend_init_notes_response) {
        this.proStatus = backendResponse.pro
        if (this.proStatus) {
            this.googleAnalytics.trackProStatusEnabled(this.googleAuth)
        }
    }

    checkWhetherUserHasSharedMoreThan3Notes(): void {
        if (this.notes.filter((el) => el.isShared).length >= 3) {
            this.userHasSharedMoreThan3Notes = true
        } else {
            this.userHasSharedMoreThan3Notes = false
        }
    }

    get amountOfSharedNotes(): number {
        return this.notes.filter((el) => el.isShared).length
    }

    requestPro(): void {
        this.googleAnalytics.trackNotesLimitReached(this.googleAuth)
        this.confirmPopup.type = 'info'
        this.confirmPopup.title = this.lang.copy.popups.titles.proDetailed
        this.confirmPopup.body =
            this.lang.copy.popups.descriptions.proLimitReached
        this.confirmPopup.open = true
        this.confirmPopup.buttonText = this.lang.copy.buttons.upgrade
        this.confirmPopup.onSuccess = () => {
            this.requests.sendTGreport.onSuccess = () => {
                this.googleAnalytics.trackProAccountRequestConfirm(() => {
                    window.location.href = this.paymentUrl
                }, this.googleAuth)
            }
            this.sendTgReportConfirm()
        }
    }

    sendTgReportConfirm(): void {
        this.requests.sendTGreport.send({
            type: 'requestProDetailedConfirmed',
            message: 'User pressed upgrade button ❤️',
            userId: this.googleAuth.userId,
        })
    }

    requestProDetailed(): void {
        this.confirmPopup.type = 'pro'
        this.confirmPopup.open = true
        this.confirmPopup.buttonText = this.lang.copy.buttons.upgrade
        this.confirmPopup.onSuccess = () => {
            this.requests.sendTGreport.onSuccess = () => {
                this.googleAnalytics.trackProAccountRequestConfirm(() => {
                    window.location.href = this.paymentUrl
                }, this.googleAuth)
            }
            this.sendTgReportConfirm()
        }
        this.requests.sendTGreport.send({
            type: 'requestProDetailed',
            message: 'User requested pro detailed',
            userId: this.googleAuth.userId,
        })
    }

    handleProAccountFromBackendInit(
        backendResponse: backend_init_notes_response
    ): void {
        if (backendResponse) {
            this.setProStatus(backendResponse)
        }

        if (this.proStatus === true) return
        this.checkWhetherUserHasSharedMoreThan3Notes()
    }

    mixpanel_setting(): void {
        mixpanel.people.set({
            id: this.googleAuth.userId,
            $name: this.googleAuth.name,
            $email: this.googleAuth.email,
            $avatar: this.googleAuth.avatarUrl,
        })
        mixpanel.identify(this.googleAuth.userId)
    }

    setAvatar(backendResponse: backend_init_notes_response): void {
        localStorage.setItem('avatar_url', backendResponse.avatar_url)
    }

    setUserID(backendResponse: backend_init_notes_response): void {
        const userID = backendResponse.user_id
        this.googleAuth.userId = userID
    }

    setEmailAndName(backendResponse: backend_init_notes_response): void {
        this.googleAuth.email = backendResponse.email
        this.googleAuth.name = backendResponse.name
        this.mixpanel_setting()
    }

    addNotes(
        backendResponse: backend_notes_response | backend_init_notes_response,
        addingNotesFromCreation = false
    ): void {
        if (backendResponse.error) {
            this.googleAuth.signOut()
            this.router.navigate([''], { queryParamsHandling: 'preserve' })
        } else {
            this.notes.unshift(
                ...(snakeToCamelCaseArray(
                    backendResponse.notes
                ) as frontendNote[])
            )
            setTimeout(() => {
                this.firstLoadedIntoUI = true
            }, 0)

            this.notes.forEach((note: frontendNote) => {
                note.changesSynced = true
            })

            this.setActiveNote(addingNotesFromCreation)
            this.scrollToActiveNote()
            this.toggleFormFocus()

            if (
                !this.userClosedAtLeasOneNote &&
                this.notes.length === 1 &&
                !this.activeNote.title &&
                !this.activeNote.body
            ) {
                this.openMobileNote()
            }

            if (addingNotesFromCreation) {
                this.navigateToActiveNote()
                this.googleAnalytics.trackNoteCreation(this.googleAuth)
            }

            this.loaderVisible = false
            this.sharingView = false

            if (!addingNotesFromCreation) {
                this.handleProAccountFromBackendInit(
                    backendResponse as backend_init_notes_response
                )
                this.setAvatar(backendResponse as backend_init_notes_response)
                this.setUserID(backendResponse as backend_init_notes_response)
                this.setEmailAndName(
                    backendResponse as backend_init_notes_response
                )
                this.googleAnalytics.trackNotesLoaded(this.googleAuth)
            }
        }
    }

    navigateToActiveNote(): void {
        this.router.navigate(['/notes', this.activeNote.id], {
            queryParamsHandling: 'preserve',
        })
    }

    changeActiveNote(note: frontendNote): void {
        this.activeNote = note
        this.toggleFormFocus()
        this.openMobileNote()
        this.sharingView = false
        this.pageTitle.setTitle('iDied - Note')
    }

    fetchNotes(): void {
        this.loaderVisible = true
        this.requests.notes.get.onSuccess = this.downloadNotes.bind(this)
        this.requests.notes.get.send()
    }

    createNote(): void {
        this.loaderVisible = true
        this.requests.notes.create.onSuccess = this.createNoteInUI.bind(this)
        this.requests.notes.create.send()
    }

    removeNoteFromUI(backendResponse: backend_notes_response): void {
        if (backendResponse.error) {
            this.googleAuth.signOut()
            this.router.navigate([''], { queryParamsHandling: 'preserve' })
        } else {
            this.confirmRemoveNote(backendResponse)
        }
    }

    confirmRemoveNote(backendResponse: backend_notes_response): void {
        this.notes = this.notes.filter(
            (note: frontendNote) => note.id !== backendResponse.notes[0].id
        )

        this.loaderVisible = false
        this.scrollToActiveNote()
        this.setActiveNote()
        this.toggleFormFocus()
        this.closeNote()
        this.googleAnalytics.trackNoteRemoval(this.googleAuth)
    }

    sendNoteRemovalRequest(): void {
        this.requests.notes.remove.onSuccess = this.removeNoteFromUI.bind(this)
        this.loaderVisible = true
        this.requests.notes.remove.send(this.activeNote)
    }

    sendRemovalConfirmation(): void {
        this.confirmPopup.type = 'noteRemoval'
        this.confirmPopup.open = true
        this.confirmPopup.onSuccess = this.sendNoteRemovalRequest.bind(this)
    }

    removeNote(): void {
        if (
            this.activeNote.body ||
            this.activeNote.title ||
            this.activeNote.isShared
        ) {
            this.sendRemovalConfirmation()
            return
        }
        this.sendNoteRemovalRequest()
    }

    notesSorted(): boolean {
        if (this.activeNote.id === this.notes[0].id) return true
        return false
    }

    scrollToActiveNote(): void {
        let selectedNoteOrder = this.selectedNoteIndex + 1 || 1
        const scrollPosotion =
            (selectedNoteOrder - 1) * 39 + (selectedNoteOrder - 1) * 5
        const scroll = () => {
            this.notesListHTML.nativeElement.scrollTo({
                top: scrollPosotion,
                behavior: 'auto',
            })
        }
        setTimeout(scroll)
    }

    reSortNotes(): void {
        if (this.notesSorted()) return
        this.notes.sort((a, b) => b.editedAt - a.editedAt)
    }

    openMobileNote() {
        if (!this.notes.length) return // id.doc.id#4
        this.notesEditing = true
        if (this.sharingInUrl && this.activeNote.isShared) {
            this.router.navigate(['/notes', this.activeNote.id, 'sharing'], {
                queryParamsHandling: 'preserve',
            })
            this.sharingInUrl = ''
            this.googleAnalytics.trackOpeningSharingNoteMobile(this.googleAuth)
        } else {
            this.router.navigate(['/notes', this.activeNote.id], {
                queryParamsHandling: 'preserve',
            })
            this.sharingView = false
            this.sharingInUrl = ''
            this.googleAnalytics.trackOpeningNoteMobile(this.googleAuth)
        }
    }

    closeNote() {
        this.notesEditing = false
        this.router.navigate(['/notes'], { queryParamsHandling: 'preserve' })
        this.setSelectedNoteIndex()
        this.scrollToActiveNote()
        localStorage.setItem('userClosedAtLeasOneNote', 'true')
        this.pageTitle.setTitle('iDied - Notes')
        this.googleAnalytics.trackClosingNoteMobile(this.googleAuth)
    }

    openSharingView(): void {
        this.sharingView = true
        this.router.navigate(['/notes', this.activeNote.id, 'sharing'], {
            queryParamsHandling: 'preserve',
        })
        this.pageTitle.setTitle('iDied - Sharing')
        this.googleAnalytics.trackOpeningSharing(this.googleAuth)
    }

    closeSharingView(): void {
        this.sharingView = false
        this.router.navigate(['/notes', this.activeNote.id], {
            queryParamsHandling: 'preserve',
        })
        this.pageTitle.setTitle('iDied - Note')
        this.googleAnalytics.trackClosingSharing(this.googleAuth)
    }

    logCopied() {
        console.log('copied')
    }
}
