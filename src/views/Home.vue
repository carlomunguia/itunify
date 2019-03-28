<template>
  <div class="home pa-4">
    <v-layout row>
      <v-text-field label="Search Term" @change="search" v-model="term"></v-text-field>
      <v-btn @click="search">Search</v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" v-text="entity"></v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(entity, index) in entities" :key="index" @click="setEntity(entity)">
            <v-list-tile-title>{{ entity }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-layout>
    <v-layout row wrap>
      <div v-for="(result, index) in results" :key="index" class="mb-4 text-xs-center pa-2">
        <img :src="result.artworkUrl100" class="mx-auto"/>
        <div v-text="result.wrapperType == 'artist' ? result.artistName : result.wrapperType == 'track' ? result.trackName : result.collectionName" class="album-name subheading mx-auto"></div>
        <div v-text="result.releaseDate && result.releaseDate.substring(0,4)" class="caption mx-auto"></div>
      </div>
    </v-layout>
  </div>
</template>

<script>
import iTunesService from '../services/iTunesService'

export default {
  data: () => ({
    term: '',
    entity: 'album',
    results: [],
    entities: ['album', 'musicArtist', 'song']
  }),
  created () {
    this.search()
  },
  methods: {
    setEntity (entity) {
      this.entity = entity
      this.search()
    },
    async search () {
      const response = await iTunesService.search({
        term: this.term,
        entity: this.entity,
        attribute: 'artistTerm',
        limit: 200
      })
      this.results = response.results
    }
  }
}
</script>

<style >
  .album-name {
    max-width: 120px;
  }
</style>
