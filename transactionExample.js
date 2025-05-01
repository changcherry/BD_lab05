const pool = require('./db');

async function doTransaction() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 開始交易

    const studentId = 'S10911002';
    const newDeptId = 'EE001';

    const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
    const [result1] = await conn.query(updateStudent, [newDeptId, studentId]);

    if (result1.affectedRows === 0) {
      throw new Error('找不到該學生，轉系失敗');
    }

    // 這裡可以加其他變更，例如 ENROLLMENT、LOG 等

    await conn.commit();
    console.log('交易成功，已提交');

    // 額外查詢：查詢目前該學生所屬系別名稱
    const queryDept = `
      SELECT s.Student_ID, s.Name, d.Department_Name
      FROM STUDENT s
      JOIN DEPARTMENT d ON s.Department_ID = d.Department_ID
      WHERE s.Student_ID = ?
    `;
    const [rows] = await conn.query(queryDept, [studentId]);

    if (rows.length > 0) {
      const student = rows[0];
      console.log(`學生 ${student.Student_ID}（${student.Name}）系別：${student.Department_Name}`);
    } else {
      console.log('查無學生資料');
    }

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('交易失敗：', err.message);
  } finally {
    if (conn) conn.release();
  }
}

doTransaction();
