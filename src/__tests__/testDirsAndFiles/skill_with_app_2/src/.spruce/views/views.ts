import BookSkillViewController from '../../skillViewControllers/Book.svc'
import BookFormViewController from '../../viewControllers/BookForm.vc'
import AppViewController from '../../App.avc'

const vcs = {
    BookSkillViewController,
    BookFormViewController
}

//@ts-ignore
heartwood({ vcs, App: AppViewController })

export default vcs