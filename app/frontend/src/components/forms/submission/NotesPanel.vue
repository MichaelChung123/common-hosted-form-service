<template>
  <div>
    <v-skeleton-loader :loading="loading" type="list-item-two-line">
      <v-btn
        v-if="!showNoteField"
        text
        small
        color="primary"
        class="pl-0"
        @click="showNoteField = true"
      >
        <v-icon class="mr-1">add</v-icon>
        <span>NEW NOTE</span>
      </v-btn>

      <div v-if="!notes.length" class="my-5">
        There are no notes on this submission yet.
      </div>

      <v-form v-if="showNoteField">
        <label>Note</label>
        <v-textarea
          v-model="newNote"
          :rules="[(v) => v.length <= 4000 || 'Max 4000 characters']"
          counter
          auto-grow
          dense
          flat
          outlined
          solid
        />
        <v-row>
          <v-col cols="12" sm="6" xl="4">
            <v-btn
              block
              color="primary"
              @click="showNoteField = false"
              outlined
            >
              <span>Cancel</span>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" xl="4" order="first" order-sm="last">
            <v-btn
              block
              color="primary"
              data-test="btn-add-note"
              :disabled="!newNote"
              @click="addNote"
            >
              <span>ADD NOTE</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <ul class="mt-5">
        <li class="mb-2" v-for="note in notes" :key="note.noteId">
          <strong>
            {{ note.createdAt | formatDateLong }} -
            {{ note.createdBy }}
          </strong>
          <br />
          {{ note.note }}
        </li>
      </ul>
    </v-skeleton-loader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { formService, rbacService } from '@/services';

export default {
  name: 'NotesPanel',
  props: {
    submissionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      historyDialog: false,
      loading: true,
      newNote: '',
      notes: [],
      showNoteField: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['keycloakSubject']),
  },
  methods: {
    ...mapActions('notifications', ['addNotification']),
    async addNote() {
      try {
        const user = await rbacService.getCurrentUser();
        const body = {
          note: this.newNote,
          userId: user.data.id,
        };
        const response = await formService.addNote(this.submissionId, body);
        if (!response.data) {
          throw new Error('No response data from API while submitting form');
        }
        this.showNoteField = false;
        this.newNote = '';
        this.getNotes();
      } catch (error) {
        this.addNotification({
          message: 'An error occured while trying to add the note.',
          consoleError: `Error adding note: ${error}`,
        });
      }
    },
    async getNotes() {
      this.loading = true;
      try {
        const response = await formService.getSubmissionNotes(
          this.submissionId
        );
        this.notes = response.data;
      } catch (error) {
        this.addNotification({
          message: 'An error occured while trying to fetch notes for this submission.',
          consoleError: `Error getting notes for ${this.submissionId}: ${error}`,
        });
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getNotes();
  },
};
</script>
