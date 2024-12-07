import BookSkillViewController from '../../skillViewControllers/Book.svc'
import BookFormViewController from '../../viewControllers/BookForm.vc'
import AppController from '../../App.ac'

const vcs = {
    BookSkillViewController,
    BookFormViewController
}

//@ts-ignore
heartwood({ vcs, App: AppController })

export default vcs