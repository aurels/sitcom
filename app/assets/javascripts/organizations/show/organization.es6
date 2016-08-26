import GeneralShow   from './general_show.es6'
import GeneralEdit   from './general_edit.es6'
import ContactsBlock from '../../shared/contacts_block.es6'

class Organization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organization:    {},
      loaded:          false,
      generalEditMode: false
    };
  }

  componentDidMount() {
    this.reloadFromBackend()
  }

  componentDidUpdate(prevProps, prevState) {
     if(prevProps.id != this.props.id) {
       this.reloadFromBackend()
     }
   }

  organizationPath() {
    return this.props.organizationsPath + '/' + this.props.id
  }

  reloadFromBackend(callback) {
    $.get(this.organizationPath(), (data) => {
      var camelData = humps.camelizeKeys(data)

      this.setState({
        organization: camelData,
        loaded:  true
      }, callback)
    });
  }

  toggleGeneralEditMode() {
    this.setState({
      generalEditMode: !this.state.generalEditMode
    })
  }

  render() {
    return (
      <div className="organization">
        {this.renderLoading()}
        {this.renderGeneral()}
        {this.renderContacts()}
      </div>
    )
  }

  renderLoading() {
    if(!this.state.loaded) {
      return (
        <div className="loading">
          <img src={this.props.loadingImagePath}/>
        </div>
      )
    }
  }

  renderGeneral() {
    if(this.state.loaded) {
      if(this.state.generalEditMode) {
        return (
          <GeneralEdit organization={this.state.organization}
                       search={this.props.search}
                       toggleEditMode={this.toggleGeneralEditMode.bind(this)}
                       reloadFromBackend={this.reloadFromBackend.bind(this)} />
        );
      }
      else {
        return (
          <GeneralShow organization={this.state.organization}
                       search={this.props.search}
                       toggleEditMode={this.toggleGeneralEditMode.bind(this)} />
        )
      }
    }
  }

  renderContacts() {
    if(this.state.loaded) {
      return (
        <ContactsBlock parent={this.state.organization}
                       parentType="organization"
                       parentPath={this.organizationPath()}
                       optionsPath={this.props.contactOptionsPath}
                       reloadFromBackend={this.reloadFromBackend.bind(this)} />
      );
    }
  }

}

module.exports = Organization