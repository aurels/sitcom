import BaseMain       from '../shared/base/base_main.es6'
import Contacts       from './index/contacts.es6'
import Contact        from './show/contact.es6'
import NewContact     from './shared/new_contact.es6'
import AdvancedSearch from './shared/advanced_search.es6'
import SavedSearches  from '../shared/saved_searches.es6'
import QuickSearch    from '../shared/quick_search.es6'

class Main extends BaseMain {
  constructor(props) {
    super(props)

    this.title          = 'Contacts'
    this.itemType       = 'contact'
    this.newButtonLabel = 'Nouveau contact'
    this.SavedSearches  = SavedSearches
    this.AdvancedSearch = AdvancedSearch
    this.exportUrl      = `${this.props.contactsPath}/export`

    this.state = {
      contacts:      [],
      loaded:        false,
      selectedCount: 0,
    }
  }

  getFilters() {
    return {
      quickSearch:     this.props.location.query.quickSearch      || '',
      name:            this.props.location.query.name             || '',
      email:           this.props.location.query.email            || '',
      address:         this.props.location.query.address          || '',
      phone:           this.props.location.query.phone            || '',
      notes:           this.props.location.query.notes            || '',
      active:          this.props.location.query.active           || '',
      organizationIds: this.props.location.query.organizationIds,
      projectIds:      this.props.location.query.projectIds,
      eventIds:        this.props.location.query.eventIds,
      fieldIds:        this.props.location.query.fieldIds,
      tagIds:          this.props.location.query.tagIds,
    }
  }

  applyNewContacts(contacts) {
    var newContacts = this.state.contacts

    contacts.forEach((contact) => {
      var index = _.findIndex(newContacts, (c) => { return contact.id == c.id})
      newContacts[index] = contact
    })

    this.setState({
      contacts: newContacts,
    })
  }

  updateSelected(contact, newValue) {
    var index    = _.findIndex(this.state.contacts, (c) => { return contact.id == c.id})
    var contacts = this.state.contacts

    contacts[index].selected = newValue

    var selectedCount = newValue ? this.state.selectedCount + 1 : this.state.selectedCount - 1

    this.setState({
      contacts:      contacts,
      selectedCount: selectedCount
    })
  }

  // @overrides
  renderQuickSearch(filters) {
    return (
      <QuickSearch title={this.title}
                   loaded={this.state.loaded}
                   results={this.state.contacts.length}
                   quickSearch={filters.quickSearch}
                   updateQuickSearch={this.updateQuickSearch.bind(this)}
                   reloadIndexFromBackend={this.reloadFromBackend.bind(this)}
                   applyNewContacts={this.applyNewContacts.bind(this)}
                   filters={filters}
                   exportUrl={this.exportUrl}
                   selectedCount={this.state.selectedCount}
                   contacts={this.state.contacts}
                   tagOptionsPath={this.props.tagOptionsPath} />
    )
  }

  renderItems() {
    return (
      <Contacts permissions={this.props.permissions}
                contacts={this.state.contacts}
                loaded={this.state.loaded}
                search={this.props.location.search}
                tagOptionsPath={this.props.tagOptionsPath}
                loadingImagePath={this.props.loadingImagePath}
                updateSelected={this.updateSelected.bind(this)}
                pushTagIdsFilter={this.pushIdsListFilter.bind(this, 'tagIds')}
                pushFieldIdsFilter={this.pushIdsListFilter.bind(this, 'fieldIds')}
                applyNewContacts={this.applyNewContacts.bind(this)}
                reloadIndexFromBackend={this.reloadFromBackend.bind(this)} />
    )
  }

  renderItem() {
    return (
      <Contact id={parseInt(this.props.params.id)}
               permissions={this.props.permissions}
               currentUserId={this.props.currentUserId}
               labId={this.props.labId}
               loaded={this.state.loaded}
               contactsPath={this.props.contactsPath}
               search={this.props.location.search}
               loadingImagePath={this.props.loadingImagePath}
               tagOptionsPath={this.props.tagOptionsPath}
               fieldOptionsPath={this.props.fieldOptionsPath}
               organizationOptionsPath={this.props.organizationOptionsPath}
               projectOptionsPath={this.props.projectOptionsPath}
               eventOptionsPath={this.props.eventOptionsPath}
               contacts={this.state.contacts}
               router={this.props.router}
               reloadIndexFromBackend={this.reloadFromBackend.bind(this)} />
    )
  }

  renderNewModal() {
    return (
      <NewContact reloadFromBackend={this.reloadFromBackend.bind(this)}
                  contactsPath={this.props.contactsPath}
                  router={this.props.router} />
    )
  }
}

module.exports = Main
