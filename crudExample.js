const pool = require('./db');

async function basicCrud() {
  let conn;
try {
    conn = await pool.getConnection();
    
    // 2. SELECT 查詢
    let sql = 'SELECT * FROM STUDENT WHERE Department_ID = ?';
    const rows = await conn.query(sql, ['CS001']);
    if (rows.length > 0) {
        console.log('查詢結果：成功', rows);
    } else {
        console.log('查詢結果：無資料');
    }
    
    // 3. UPDATE 更新
    sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
    const result = await conn.query(sql, ['王大名', 'S10811001']);
    if (result.affectedRows > 0) {
        console.log('更新結果：更新成功');
    } else {
        console.log('更新結果：無更新');
    }
} catch (err) {
    console.error('操作失敗:', err);
} finally {
    if (conn) conn.release();
}
}

basicCrud();