exports.up = function (knex) {
  return Promise.resolve()
    // add a submission history table
    .then(() => knex.schema.createTable('form_submission_audit', table => {
      table.uuid('id').primary();
      table.uuid('submissionId').notNullable().index();
      table.string('dbUser').notNullable();
      table.string('updatedByUsername');
      table.timestamp('actionTimestamp', { useTz: true }).defaultTo(knex.fn.now());
      table.string('action').notNullable();
      table.jsonb('originalData');
    }))

    .then(() => knex.schema.raw(`CREATE OR REPLACE FUNCTION public.submission_audited_func() RETURNS trigger AS $body$
    DECLARE
        v_old_data json;
    BEGIN
        if (TG_OP = 'UPDATE') then
            v_old_data := row_to_json(OLD);
            insert into public.form_submission_audit (id, "submissionId", "dbUser", "updatedByUsername", "actionTimestamp", "action", "originalData")
            values (
                uuid_in(overlay(overlay(md5(random()::text || ':' || clock_timestamp()::text) placing '4' from 13) placing to_hex(floor(random()*(11-8+1) + 8)::int)::text from 17)::cstring),
            OLD.id,
            SESSION_USER,
            NEW."updatedBy",
            now(),
            'U',
            v_old_data);
            RETURN NEW;
        elsif (TG_OP = 'DELETE') then
            v_old_data := row_to_json(OLD);
            insert into public.form_submission_audit (id, "submissionId", "dbUser", "actionTimestamp", "action", "originalData")
            values (
                uuid_in(overlay(overlay(md5(random()::text || ':' || clock_timestamp()::text) placing '4' from 13) placing to_hex(floor(random()*(11-8+1) + 8)::int)::text from 17)::cstring),
            OLD.id,
            SESSION_USER,
            now(),
            'D',
            v_old_data);
        end if;
    END;
    $body$ LANGUAGE plpgsql`))

    .then(() => knex.schema.raw(`CREATE TRIGGER form_submission_audit_trigger
    AFTER UPDATE OR DELETE ON form_submission
    FOR EACH ROW EXECUTE PROCEDURE public.submission_audited_func();`));
};

exports.down = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.raw('DROP TRIGGER form_submission_audit_trigger ON form_submission'))
    .then(() => knex.schema.raw('DROP FUNCTION submission_audited_func()'))
    .then(() => knex.schema.dropTableIfExists('form_submission_audit'));
};
