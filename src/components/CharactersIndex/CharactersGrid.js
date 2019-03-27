import React from 'react'
import CharacterCard from './CharacterCard'
import { Card } from 'semantic-ui-react'

const CharactersGrid = props => {
  return (
    <Card.Group stackable itemsPerRow={props.gridSize}>
      {props.characters.map(character => (
        <CharacterCard key={character.id} {...character} />
      ))}
    </Card.Group>
  )
}

export default CharactersGrid
