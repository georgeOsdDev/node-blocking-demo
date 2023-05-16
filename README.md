# Demo for blocking behavior of Node.js `fs` module with Azure Functions Node Language Worker

## Application Setting
[`FUNCTIONS_WORKER_PROCESS_COUNT`](https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings#functions_worker_process_count) default = 1

### FUNCTIONS_WORKER_PROCESS_COUNT = 1

`TimerTrigger1`
Executed every 1 min(`"0 */1 * * * *"`)

Basically this function invocation finish in 10 seconds
```
[2023-05-16T11:46:00.006Z] Executing 'Functions.TimerTrigger1' (Reason='Timer fired at 2023-05-16T11:46:00.0058799+00:00', Id=60f8da82-2ac9-4dc2-9cd7-907dd3f2627c)
[2023-05-16T11:46:00.019Z] [Timer1 start] PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 2023-05-16T11:46:00.014Z
[2023-05-16T11:46:01.020Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 1, 2023-05-16T11:46:01.017Z
[2023-05-16T11:46:02.022Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 2, 2023-05-16T11:46:02.019Z
[2023-05-16T11:46:03.026Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 3, 2023-05-16T11:46:03.021Z
[2023-05-16T11:46:04.028Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 4, 2023-05-16T11:46:04.026Z
[2023-05-16T11:46:05.029Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 5, 2023-05-16T11:46:05.028Z
[2023-05-16T11:46:06.032Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 6, 2023-05-16T11:46:06.030Z
[2023-05-16T11:46:07.037Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 7, 2023-05-16T11:46:07.035Z
[2023-05-16T11:46:08.044Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 8, 2023-05-16T11:46:08.042Z
[2023-05-16T11:46:09.046Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 9, 2023-05-16T11:46:09.044Z
[2023-05-16T11:46:10.052Z] Loop of PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 10, 2023-05-16T11:46:10.050Z
[2023-05-16T11:46:10.053Z] [Timer1 end]: PID:14731, InvocationId:60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, 2023-05-16T11:46:10.050Z
[2023-05-16T11:46:10.055Z] Executed 'Functions.TimerTrigger1' (Succeeded, Id=60f8da82-2ac9-4dc2-9cd7-907dd3f2627c, Duration=10049ms)
```

`TimerTrigger2`
Executed every 3 min(`"5 */3 * * * *"`)

This function use `fs` sync methods for blocking.
Thus loop of `TimerTrigger1` will be blocked during `TimerTrigger2` is executing.

```
[2023-05-16T11:47:10.059Z] Executed 'Functions.TimerTrigger1' (Succeeded, Id=256f7d58-cd05-4895-bc8b-3688cdce0f27, Duration=10051ms)
[2023-05-16T11:48:00.000Z] Executing 'Functions.TimerTrigger1' (Reason='Timer fired at 2023-05-16T11:47:59.9982551+00:00', Id=5427d7cd-35c3-412b-bfcb-56a5a9818172)
[2023-05-16T11:48:00.012Z] [Timer1 start] PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 2023-05-16T11:48:00.009Z
[2023-05-16T11:48:01.014Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 1, 2023-05-16T11:48:01.010Z
[2023-05-16T11:48:02.017Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 2, 2023-05-16T11:48:02.015Z
[2023-05-16T11:48:03.021Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 3, 2023-05-16T11:48:03.019Z
[2023-05-16T11:48:04.029Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 4, 2023-05-16T11:48:04.026Z
[2023-05-16T11:48:04.999Z] Executing 'Functions.TimerTrigger2' (Reason='Timer fired at 2023-05-16T11:48:04.9988867+00:00', Id=f7fe22e9-9950-41a2-af6d-368a28bb408b)
[2023-05-16T11:48:06.083Z] [Timer2(blocking) start] PID:14731, InvocationId:f7fe22e9-9950-41a2-af6d-368a28bb408b, 2023-05-16T11:48:05.003Z
[2023-05-16T11:48:06.084Z] [Timer2(blocking) end] PID:14731, InvocationId:f7fe22e9-9950-41a2-af6d-368a28bb408b, 3000, 2023-05-16T11:48:06.082Z
[2023-05-16T11:48:06.085Z] Executed 'Functions.TimerTrigger2' (Succeeded, Id=f7fe22e9-9950-41a2-af6d-368a28bb408b, Duration=1086ms)
[2023-05-16T11:48:06.085Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 5, 2023-05-16T11:48:06.083Z
[2023-05-16T11:48:07.085Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 6, 2023-05-16T11:48:07.084Z
[2023-05-16T11:48:08.089Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 7, 2023-05-16T11:48:08.086Z
[2023-05-16T11:48:09.091Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 8, 2023-05-16T11:48:09.089Z
[2023-05-16T11:48:10.099Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 9, 2023-05-16T11:48:10.096Z
[2023-05-16T11:48:11.102Z] Loop of PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 10, 2023-05-16T11:48:11.099Z
[2023-05-16T11:48:11.102Z] [Timer1 end]: PID:14731, InvocationId:5427d7cd-35c3-412b-bfcb-56a5a9818172, 2023-05-16T11:48:11.100Z
[2023-05-16T11:48:11.104Z] Executed 'Functions.TimerTrigger1' (Succeeded, Id=5427d7cd-35c3-412b-bfcb-56a5a9818172, Duration=11105ms)
```

`TimerTrigger3`
Executed every 5 min(`"5 */5 * * * *"`)

This function use `fs` async methods for *Non*-blocking.
Thus loop of `TimerTrigger1` will not be blocked during `TimerTrigger3` is executing.

```
[2023-05-16T11:50:00.010Z] Executing 'Functions.TimerTrigger1' (Reason='Timer fired at 2023-05-16T11:50:00.0100741+00:00', Id=029a02fc-abe8-4baf-bf75-87a292825114)
[2023-05-16T11:50:00.019Z] [Timer1 start] PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 2023-05-16T11:50:00.015Z
[2023-05-16T11:50:01.026Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 1, 2023-05-16T11:50:01.024Z
[2023-05-16T11:50:02.036Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 2, 2023-05-16T11:50:02.032Z
[2023-05-16T11:50:03.039Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 3, 2023-05-16T11:50:03.037Z
[2023-05-16T11:50:04.050Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 4, 2023-05-16T11:50:04.045Z
[2023-05-16T11:50:04.999Z] Executing 'Functions.TimerTrigger3' (Reason='Timer fired at 2023-05-16T11:50:04.9987310+00:00', Id=4dd1b56b-6b27-49e9-8c52-ad9f3b77afda)
[2023-05-16T11:50:05.008Z] [Timer3(Non blocking) start] PID:14731, InvocationId:4dd1b56b-6b27-49e9-8c52-ad9f3b77afda, 2023-05-16T11:50:05.005Z
[2023-05-16T11:50:05.046Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 5, 2023-05-16T11:50:05.045Z
[2023-05-16T11:50:06.046Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 6, 2023-05-16T11:50:06.045Z
[2023-05-16T11:50:07.046Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 7, 2023-05-16T11:50:07.045Z
[2023-05-16T11:50:08.046Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 8, 2023-05-16T11:50:08.045Z
[2023-05-16T11:50:09.046Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 9, 2023-05-16T11:50:09.045Z
[2023-05-16T11:50:10.046Z] Loop of PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 10, 2023-05-16T11:50:10.045Z
[2023-05-16T11:50:10.046Z] [Timer1 end]: PID:14731, InvocationId:029a02fc-abe8-4baf-bf75-87a292825114, 2023-05-16T11:50:10.045Z
[2023-05-16T11:50:10.047Z] Executed 'Functions.TimerTrigger1' (Succeeded, Id=029a02fc-abe8-4baf-bf75-87a292825114, Duration=10037ms)
[2023-05-16T11:50:13.249Z] [Timer3(Non blocking) end] PID:14731, InvocationId:4dd1b56b-6b27-49e9-8c52-ad9f3b77afda, 3000, 2023-05-16T11:50:13.248Z
[2023-05-16T11:50:13.250Z] Executed 'Functions.TimerTrigger3' (Succeeded, Id=4dd1b56b-6b27-49e9-8c52-ad9f3b77afda, Duration=8251ms)
```

### FUNCTIONS_WORKER_PROCESS_COUNT = 2

`TimerTrigger1`(PID:16939) and `TimerTrigger2`(PID:16843) were executed on different Node process.
Thus `TimerTrigger2` did not affect `TimerTrigger1`.

```
[2023-05-16T11:56:59.998Z] Executing 'Functions.TimerTrigger1' (Reason='Timer fired at 2023-05-16T11:56:59.9966547+00:00', Id=4e4b10d9-dc8f-49d4-908f-1f93f44c8faa)
[2023-05-16T11:57:00.008Z] [Timer1 start] PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 2023-05-16T11:57:00.005Z
[2023-05-16T11:57:01.009Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 1, 2023-05-16T11:57:01.008Z
[2023-05-16T11:57:02.013Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 2, 2023-05-16T11:57:02.011Z
[2023-05-16T11:57:03.013Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 3, 2023-05-16T11:57:03.011Z
[2023-05-16T11:57:04.016Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 4, 2023-05-16T11:57:04.014Z
[2023-05-16T11:57:05.001Z] Executing 'Functions.TimerTrigger2' (Reason='Timer fired at 2023-05-16T11:57:05.0006323+00:00', Id=5ea5a5ff-20d9-44ec-99c5-08c2df4b18e5)
[2023-05-16T11:57:05.019Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 5, 2023-05-16T11:57:05.016Z
[2023-05-16T11:57:06.020Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 6, 2023-05-16T11:57:06.018Z
[2023-05-16T11:57:06.431Z] [Timer2(blocking) start] PID:16843, InvocationId:5ea5a5ff-20d9-44ec-99c5-08c2df4b18e5, 2023-05-16T11:57:05.028Z
[2023-05-16T11:57:06.431Z] [Timer2(blocking) end] PID:16843, InvocationId:5ea5a5ff-20d9-44ec-99c5-08c2df4b18e5, 3000, 2023-05-16T11:57:06.429Z
[2023-05-16T11:57:06.432Z] Executed 'Functions.TimerTrigger2' (Succeeded, Id=5ea5a5ff-20d9-44ec-99c5-08c2df4b18e5, Duration=1431ms)
[2023-05-16T11:57:07.021Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 7, 2023-05-16T11:57:07.020Z
[2023-05-16T11:57:08.024Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 8, 2023-05-16T11:57:08.023Z
[2023-05-16T11:57:09.036Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 9, 2023-05-16T11:57:09.034Z
[2023-05-16T11:57:10.039Z] Loop of PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 10, 2023-05-16T11:57:10.036Z
[2023-05-16T11:57:10.040Z] [Timer1 end]: PID:16939, InvocationId:4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, 2023-05-16T11:57:10.037Z
[2023-05-16T11:57:10.042Z] Executed 'Functions.TimerTrigger1' (Succeeded, Id=4e4b10d9-dc8f-49d4-908f-1f93f44c8faa, Duration=10046ms)
```
