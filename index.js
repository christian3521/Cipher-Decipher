const myWorker = new Worker('js/worker.js');

function EncryptPasswordOnWorker(password, field)
{
	myWorker.postMessage({
		functionCall: ENCRYPT_DATA,
		args: {
			password,
			field
		}
	});
}

function DecryptPasswordOnWorker(password, field)
{
	myWorker.postMessage({
		functionCall: DECRYPT_DATA,
		args: {
			password,
			field
		}
	});
}

function OnCipherInputChange()
{
	const CipherInputField 		= document.getElementById("CipherInputField").value;
	const CipherFunctionField 	= document.getElementById("CipherFunctionField").value - 1;
	if(CipherFunctionField == DECRYPT_DATA)
	{
		DecryptPasswordOnWorker(he.decode(CipherInputField.trim()), "CipherResultField");
	}
	else
	{
		EncryptPasswordOnWorker(CipherInputField, "CipherResultField");
	}
}

myWorker.addEventListener('message', (e) => {
	switch(e.data.functionCall)
	{
		case DECRYPT_DATA:
		case ENCRYPT_DATA:
			document.getElementById(e.data.field).value = e.data.return;
			break;
	}
});

OnCipherInputChange();
