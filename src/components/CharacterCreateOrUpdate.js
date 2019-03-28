import React from "react"
import {
  Form,
  Button,
  Input,
  Container,
  Grid,
  TextArea,
  Label
} from "semantic-ui-react"
import API from "../adapters/API"

class CharacterCreateOrUpdate extends React.Component {
  state = {
    user_id: "",
    first_name: "",
    last_name: "",
    alias: "",
    motto: "",
    species: "",
    bio: "",
    alignment: "",
    traits_positive: "",
    traits_negative: "",
    age: "",
    gender: "",
    status: "",
    feats: "",
    edit: true,
    unlockedAttributes: [
      "first_name",
      "last_name",
      "alias",
      "motto",
      "species",
      "bio",
      "alignment",
      "traits_positive",
      "traits_negative",
      "age",
      "status",
      "feats",
      "gender"
    ]
  }

  handleSubmit = () => {
    if (this.state.edit) {
      API.updateCharacter(this.state)
    } else {
      API.createCharacter(this.state).then(alert("char created BOIIIIIIII!"))
    }
    this.state.user_id === 1
      ? this.props.history.push("/characters")
      : this.props.history.push("/myaccount")
  }

  componentDidMount = () => {
    if (this.props.user_id) {
      this.setState({ user_id: this.props.user_id })
    } else {
      this.setState({ user_id: 1 }) // If not signed in create as guest
    }

    if (this.props.match.path.includes("edit")) {
      API.getCharacterById(this.props.match.params.id).then(character =>
        this.setState({ ...character })
      )
    } else {
      this.setState({ edit: false })
      this.randomizeUnlockedAttributes()
    }
  }

  randomizeUnlockedAttributes = () =>
    API.generateNewCharacter().then(character =>
      Object.keys(character).map(attribute =>
        this.state.unlockedAttributes.includes(attribute)
          ? this.setState({ [attribute]: character[attribute] })
          : null
      )
    )

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleRandomAttribute = event => {
    event.persist()
    API.generateAttribute(event.target.id).then(attribute =>
      this.setState({ ...attribute })
    )
  }

  handleLockAttribute = event => {
    event.persist()
    if (!this.state.unlockedAttributes.includes(event.target.id)) {
      this.setState({
        unlockedAttributes: [...this.state.unlockedAttributes, event.target.id]
      })
    } else {
      this.setState({
        unlockedAttributes: this.state.unlockedAttributes.filter(
          attribute => attribute !== event.target.id
        )
      })
    }
  }

  addButtonsToInput = attribute => {
    const locked = this.state.unlockedAttributes.includes(attribute)
    return (
      <div style={{ display: "flex" }}>
        <Button
          toggle
          active={locked}
          onClick={this.handleLockAttribute}
          id={attribute}
          attached='right'
          icon={locked ? "lock open icon" : "lock closed icon"}
        />
      </div>
    )
  }

  render() {
    const divStyle = {
      width: "60%",
      margin: "10px auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }

    return (
      <Container>
        <h1>{this.state.edit ? "Edit Character " : "Create Character"}</h1>
        {!this.state.edit ? (
          <Button
            fluid
            onClick={this.randomizeUnlockedAttributes}
            content='Randomize'
            icon='random'
            color='violet'
          />
        ) : null}
        <hr />
        <Grid columns={1}>
          <Grid.Column>
            <Form onSubmit={this.handleSubmit}>
              <div style={divStyle}>
                <Input
                  label='First Name'
                  onChange={this.handleChange}
                  name='first_name'
                  value={this.state.first_name}
                />
                {this.addButtonsToInput("first_name")}
              </div>
              <div style={divStyle}>
                <Input
                  label='Last Name'
                  onChange={this.handleChange}
                  name='last_name'
                  value={this.state.last_name}
                />
                {this.addButtonsToInput("last_name")}
              </div>
              <div style={divStyle}>
                <Input
                  label='Alias'
                  onChange={this.handleChange}
                  name='alias'
                  value={this.state.alias}
                />
                {this.addButtonsToInput("alias")}
              </div>
              <div style={divStyle}>
                <Input
                  label='Species'
                  onChange={this.handleChange}
                  name='species'
                  value={this.state.species}
                />
                {this.addButtonsToInput("species")}
              </div>

              <div style={divStyle}>
                <Input
                  label='Motto'
                  onChange={this.handleChange}
                  name='motto'
                  value={this.state.motto}
                />
                {this.addButtonsToInput("motto")}
              </div>

              <div style={divStyle}>
                <Input
                  label='Alignment'
                  onChange={this.handleChange}
                  name='alignment'
                  value={this.state.alignment}
                />
                {this.addButtonsToInput("alignment")}
              </div>
              <div style={divStyle}>
                <Input
                  label='Positive Traits'
                  onChange={this.handleChange}
                  name='traits_positive'
                  value={this.state.traits_positive}
                />
                {this.addButtonsToInput("traits_positive")}
              </div>

              <div style={divStyle}>
                <Input
                  label='Negative Traits'
                  onChange={this.handleChange}
                  name='traits_negative'
                  value={this.state.traits_negative}
                />
                {this.addButtonsToInput("traits_negative")}
              </div>

              <div style={divStyle}>
                <Input
                  label='Age'
                  onChange={this.handleChange}
                  name='age'
                  value={this.state.age}
                />
                {this.addButtonsToInput("age")}
              </div>
              <div style={divStyle} />

              <div style={divStyle}>
                <Input
                  label='Status'
                  onChange={this.handleChange}
                  name='status'
                  value={this.state.status}
                />
                {this.addButtonsToInput("status")}
              </div>

              <div style={divStyle}>
                <Input
                  label='Gender'
                  onChange={this.handleChange}
                  name='gender'
                  value={this.state.gender}
                />

                {this.addButtonsToInput("gender")}
              </div>

              <div style={divStyle}>
                <Input
                  label='Feats'
                  onChange={this.handleChange}
                  name='feats'
                  value={this.state.feats}
                />
                {this.addButtonsToInput("feats")}
              </div>
              <div style={divStyle}>
                <Label size='large'>Bio</Label>
                <br />
                <TextArea
                  rows='4'
                  label='Bio'
                  onChange={this.handleChange}
                  name='bio'
                  value={this.state.bio}
                />
                {this.addButtonsToInput("bio")}
              </div>

              <hr />
              <Button color='green' fluid>
                {this.state.edit ? "Update Character" : "Create Character"}
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
export default CharacterCreateOrUpdate
