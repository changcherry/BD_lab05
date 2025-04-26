const pool = require('./db');

async function basicCrud() {
  let conn;
try {
    conn = await pool.getConnection();
       // 1. INSERT 新增
       let sql;
       sql = 'INSERT INTO STUDENT (Student_ID, Name,Birth_Date, Gender, Email,Phone,Address,Admission_Year,Status,Department_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
       try {
           await conn.query(sql, ['S10810011', '王大頭','2002-02-02', 'M', 'wang@example.com', '09123345678','台北市信義區信義路五段2號','2008','在學','CS001']);
           console.log('已新增一筆學生資料');
       } catch (err) {
           console.error('資料新增失敗！錯誤內容:', err);
       }
       
       // 2. SELECT 查詢
       sql = 'SELECT * FROM STUDENT WHERE Department_ID = ?';
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
       }
   } catch (err) {
       console.error('操作失敗:', err);
   
    // 4. DELETE 刪除
    sql = 'DELETE FROM STUDENT WHERE Student_ID = ?';
    const result = await conn.query(sql, ['S10810011']);
    if (result.affectedRows >0){
        console.log('已刪除該學生');
} else {
    console.log('刪除該學生失敗！');
}

}

basicCrud();