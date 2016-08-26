class SocialEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facebookUrl: this.props.contact.facebookUrl,
      linkedinUrl: this.props.contact.linkedinUrl,
      twitterUrl:  this.props.contact.twitterUrl,
    };
  }

  backendUpdateContact() {
    var params = {
      _method: 'PUT',
      contact: {
        facebookUrl: this.state.facebookUrl,
        linkedinUrl: this.state.linkedinUrl,
        twitterUrl:  this.state.twitterUrl
      }
    }

    $.post(this.props.contactPath, humps.decamelizeKeys(params), (data) => {
      this.props.reloadFromBackend(this.props.toggleEditMode)
    });
  }

  updateFacebookUrl(e) {
    this.setState({
      facebookUrl: e.target.value
    })
  }

  updateLinkedinUrl(e) {
    this.setState({
      linkedinUrl: e.target.value
    })
  }

  updateTwitterUrl(e) {
    this.setState({
      twitterUrl: e.target.value
    })
  }

  render() {
    return (
      <div className="social edit">
        <div className="row">
          { this.renderFacebook() }
          { this.renderLinkedin() }
          { this.renderTwitter() }
        </div>

        { this.renderActions() }
      </div>
    );
  }

  renderFacebook() {
    return (
      <div className="col-md-12 facebook">
        <i className="fa fa-facebook-square"></i>
        <input type="text"
               defaultValue={this.state.facebookUrl}
               onChange={this.updateFacebookUrl.bind(this)} />
      </div>
    )
  }

  renderLinkedin() {
    return (
      <div className="col-md-12 linkedin">
        <i className="fa fa-linkedin-square"></i>
        <input type="text"
               defaultValue={this.state.linkedinUrl}
               onChange={this.updateLinkedinUrl.bind(this)} />
      </div>
    )
  }

  renderTwitter() {
    return (
      <div className="col-md-12 twitter">
        <i className="fa fa-twitter-square"></i>
        <input type="text"
               defaultValue={this.state.twitterUrl}
               onChange={this.updateTwitterUrl.bind(this)} />
      </div>
    )
  }

  renderActions() {
    return (
      <div className="actions">
        <button className="btn btn-secondary"
                onClick={this.props.toggleEditMode}>
          Annuler
        </button>

        <button className="btn btn-secondary"
                onClick={this.backendUpdateContact.bind(this)}>
          Enregistrer
        </button>
      </div>
    )
  }
}

module.exports = SocialEdit