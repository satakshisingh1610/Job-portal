// Simple test to check if backend can start
console.log('Starting backend test...');

try {
  import('express').then(express => {
    console.log('✅ Express imported successfully');
    
    import('dotenv').then(dotenv => {
      console.log('✅ Dotenv imported successfully');
      dotenv.config();
      console.log('✅ Dotenv configured');
      
      import('./config/db.js').then(db => {
        console.log('✅ DB config imported successfully');
        db.default().then(() => {
          console.log('✅ Database connected successfully');
          
          const app = express.default();
          app.listen(5000, () => {
            console.log('✅ Backend server started successfully on port 5000');
          });
        }).catch(err => {
          console.error('❌ Database connection failed:', err.message);
        });
      });
    });
  });
} catch (error) {
  console.error('❌ Backend test failed:', error.message);
}
