-- Добавляем запись в meta таблицу после добавления нового пользователя
CREATE OR REPLACE FUNCTION insert_tg_user_meta()
    RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO tg_users_meta (id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_tg_user_insert
    AFTER INSERT ON tg_users
    FOR EACH ROW
EXECUTE FUNCTION insert_tg_user_meta();
